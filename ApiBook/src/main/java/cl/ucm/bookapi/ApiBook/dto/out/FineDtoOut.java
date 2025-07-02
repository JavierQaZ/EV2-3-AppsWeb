package cl.ucm.bookapi.ApiBook.dto.out;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FineDtoOut {
    private Integer id;
    private Integer amount;
    private String description;
    private Boolean state;
}
