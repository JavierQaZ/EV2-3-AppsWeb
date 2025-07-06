package cl.ucm.bookapi.ApiBook.dto.out;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReaderDetailDto {
    private String email;
    private String name;
    private String lastName;
    private Boolean state;
}
