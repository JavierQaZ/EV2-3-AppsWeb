package cl.ucm.bookapi.ApiBook.dto.in;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDto {
    private String name;
    private String lastName;
    private String email;
    private String password;
}
