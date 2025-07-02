package cl.ucm.bookapi.ApiBook.dto.out;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingDtoOut {
    private Integer id;
    private String email;
    private Integer copybookFk;
    private LocalDate dateBooking;
    private LocalDate dateReturn;
    private Boolean state;
}
