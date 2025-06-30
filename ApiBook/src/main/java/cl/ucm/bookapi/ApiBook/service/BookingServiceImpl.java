package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.BookingDtoIn;
import cl.ucm.bookapi.ApiBook.dto.in.ReturnDto;
import cl.ucm.bookapi.ApiBook.dto.out.BookingDtoOut;
import cl.ucm.bookapi.ApiBook.entities.BookingEntity;
import cl.ucm.bookapi.ApiBook.entities.CopyBookEntity;
import cl.ucm.bookapi.ApiBook.entities.FineEntity;
import cl.ucm.bookapi.ApiBook.entities.UserEntity;
import cl.ucm.bookapi.ApiBook.repository.BookingRepository;
import cl.ucm.bookapi.ApiBook.repository.CopyBookRepository;
import cl.ucm.bookapi.ApiBook.repository.FineRepository;
import cl.ucm.bookapi.ApiBook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CopyBookRepository copyBookRepository;

    @Autowired
    private FineRepository fineRepository;

    @Override
    public BookingDtoOut createBooking(BookingDtoIn dto) {
        UserEntity user = userRepository.findById(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no Encontrado"));

        if (!user.getState()) throw new RuntimeException("Usuario Bloqueado");

        long activos = bookingRepository.findByUserFk(dto.getEmail())
                .stream().filter(BookingEntity::getState).count();
        if (activos >= 3) throw new RuntimeException("Máximo de 3 préstamos activos");

        CopyBookEntity copy = copyBookRepository.findById(dto.getCopybookFk())
                .orElseThrow(() -> new RuntimeException("Copia no encontrada"));

        if (!copy.getState()) throw new RuntimeException("Copia no disponible");

        BookingEntity booking = new BookingEntity();
        booking.setUserFk(dto.getEmail());
        booking.setCopybookFk(dto.getCopybookFk());
        booking.setDateBooking(LocalDate.now());
        booking.setDateReturn(LocalDate.now().plusDays(5));
        booking.setState(true);
        bookingRepository.save(booking);

        copy.setState(false);
        copyBookRepository.save(copy);

        return toDto(booking);
    }

    @Override
    public BookingDtoOut returnBook(Integer bookingId, ReturnDto dto) {
        BookingEntity booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));

        if (!booking.getState()) throw new RuntimeException("Ya fue devuelto");

        booking.setState(false);
        bookingRepository.save(booking);

        CopyBookEntity copy = copyBookRepository.findById(booking.getCopybookFk())
                .orElseThrow(() -> new RuntimeException("Copia no encontrada"));
        copy.setState(true);
        copyBookRepository.save(copy);

        if (dto.getDateReturn().isAfter(booking.getDateReturn())) {
            long diasAtraso = ChronoUnit.DAYS.between(booking.getDateReturn(), dto.getDateReturn());
            int multa = (int) diasAtraso * 1000;

            FineEntity fine = new FineEntity();
            fine.setAmount(multa);
            fine.setDescription("Multa por atraso - Préstamo ID: " + booking.getId());
            fine.setUserFk(booking.getUserFk());
            fine.setState(true);
            fineRepository.save(fine);

            UserEntity user = userRepository.findById(booking.getUserFk()).orElseThrow();
            user.setState(false);
            userRepository.save(user);
        }
        return toDto(booking);
    }

    @Override
    public List<BookingDtoOut> getBookingByUser(String email) {
        return bookingRepository.findByUserFk(email).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private BookingDtoOut toDto(BookingEntity b) {
        BookingDtoOut dto = new BookingDtoOut();
        dto.setId(b.getId());
        dto.setCopybookFk(b.getCopybookFk());
        dto.setEmail(b.getUserFk());
        dto.setDateBooking(b.getDateBooking());
        dto.setDateReturn(b.getDateReturn());
        dto.setState(b.getState());
        return dto;
    }
}
