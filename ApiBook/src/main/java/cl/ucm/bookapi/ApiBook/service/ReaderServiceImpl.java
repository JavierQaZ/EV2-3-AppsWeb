package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.ChangeStateDto;
import cl.ucm.bookapi.ApiBook.dto.out.BookingDtoOut;
import cl.ucm.bookapi.ApiBook.dto.out.FineDtoOut;
import cl.ucm.bookapi.ApiBook.dto.out.ReaderDetailDto;
import cl.ucm.bookapi.ApiBook.entities.UserEntity;
import cl.ucm.bookapi.ApiBook.repository.BookingRepository;
import cl.ucm.bookapi.ApiBook.repository.FineRepository;
import cl.ucm.bookapi.ApiBook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class ReaderServiceImpl implements ReaderService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FineRepository fineRepository;

    @Override
    public ReaderDetailDto getReaderByEmail(String email) {
        UserEntity user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        ReaderDetailDto dto = new ReaderDetailDto();
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setLastName(user.getLastName());
        dto.setState(user.getState());

        dto.setBookings(
                bookingRepository.findByUserFk(email).stream()
                        .map(b -> {
                            BookingDtoOut out = new BookingDtoOut();
                            out.setId(b.getId());
                            out.setEmail(b.getUserFk());
                            out.setCopybookFk(b.getCopybookFk());
                            out.setDateBooking(b.getDateBooking());
                            out.setDateReturn(b.getDateReturn());
                            out.setState(b.getState());
                            return out;
                        }).collect(Collectors.toList())
        );

        dto.setFines(
                fineRepository.findByUserFk(email).stream()
                        .map(f -> {
                            FineDtoOut out = new FineDtoOut();
                            out.setId(f.getId());
                            out.setAmount(f.getAmount());
                            out.setDescription(f.getDescription());
                            out.setState(f.getState());
                            return out;
                        }).collect(Collectors.toList())
        );
        return dto;
    }

    @Override
    public void updateState(String email, ChangeStateDto dto) {
        UserEntity user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setState(dto.getState());
        userRepository.save(user);
    }
}
