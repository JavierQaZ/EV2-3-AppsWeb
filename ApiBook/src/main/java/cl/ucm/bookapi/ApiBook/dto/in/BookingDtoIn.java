package cl.ucm.bookapi.ApiBook.dto.in;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingDtoIn {
    private String userFk;
    private Integer copybookFk;
}
