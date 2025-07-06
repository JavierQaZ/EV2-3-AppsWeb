package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.BookingDtoIn;
import cl.ucm.bookapi.ApiBook.dto.in.ReturnDto;
import cl.ucm.bookapi.ApiBook.dto.out.BookingDtoOut;
import cl.ucm.bookapi.ApiBook.entities.*;
import cl.ucm.bookapi.ApiBook.repository.BookingRepository;
import cl.ucm.bookapi.ApiBook.repository.CopyBookRepository;
import cl.ucm.bookapi.ApiBook.repository.FineRepository;
import cl.ucm.bookapi.ApiBook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
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
        UserEntity user = userRepository.findById(dto.getUserFk())
                .orElseThrow(() -> new RuntimeException("Usuario no Encontrado"));

        if (!user.getState()) throw new RuntimeException("Usuario Bloqueado");

        long activos = bookingRepository.findByUserFk(dto.getUserFk())
                .stream().filter(BookingEntity::getState).count();
        if (activos >= 3) throw new RuntimeException("Máximo de 3 préstamos activos");

        CopyBookEntity copy = copyBookRepository.findById(dto.getCopybookFk())
                .orElseThrow(() -> new RuntimeException("Copia no encontrada"));

        if (!copy.getState()) throw new RuntimeException("Copia no disponible");

        BookingEntity booking = new BookingEntity();
        booking.setUserFk(dto.getUserFk());
        booking.setCopybookFk(dto.getCopybookFk());
        booking.setDateBooking(LocalDate.now());
        booking.setDateReturn(LocalDate.now().plusDays(5));
        booking.setState(true);
        bookingRepository.save(booking);
        booking = bookingRepository.findById(booking.getId()).orElseThrow();

        copy.setState(false);
        copyBookRepository.save(copy);

        return toDtoWithBook(booking);
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

            String titulo = "Libro desconocido";
            if (copy.getBookEntity() != null && copy.getBookEntity().getTitle() != null) {
                titulo = copy.getBookEntity().getTitle();
            }
            FineEntity fine = new FineEntity();
            fine.setAmount(multa);
            fine.setDescription("Multa por atraso - Libro: " + titulo);
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
                .filter(BookingEntity::getState)
                .map(this::toDtoWithBook)
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

    private BookingDtoOut toDtoWithBook(BookingEntity b) {
        BookingDtoOut dto = new BookingDtoOut();
        dto.setId(b.getId());
        dto.setCopybookFk(b.getCopybookFk());
        dto.setEmail(b.getUserFk());
        dto.setDateBooking(b.getDateBooking());
        dto.setDateReturn(b.getDateReturn());
        dto.setState(b.getState());

        copyBookRepository.findById(b.getCopybookFk()).ifPresent(copy -> {
            BookEntity book = copy.getBookEntity();
            dto.setTitle(book.getTitle());
            dto.setAuthor(book.getAuthor());
            dto.setType(book.getType());

            if (book.getImage64() != null) {
                byte[] bytes = new byte[book.getImage64().length];
                for (int i = 0; i < book.getImage64().length; i++) {
                    bytes[i] = book.getImage64()[i];
                }
                String base64 = java.util.Base64.getEncoder().encodeToString(bytes);
                dto.setImage64("data:image/jpeg;base64," + base64);
            }
        });
        return dto;
    }
}
