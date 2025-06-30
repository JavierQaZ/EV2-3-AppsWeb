package cl.ucm.bookapi.ApiBook.dto.out;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDtoOut {
    private String name;
    private String lastName;
    private String email;
    private Boolean state;
}
