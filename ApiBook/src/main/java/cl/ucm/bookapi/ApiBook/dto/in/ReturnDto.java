package cl.ucm.bookapi.ApiBook.dto.in;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReturnDto {
    private LocalDate dateReturn;

}
