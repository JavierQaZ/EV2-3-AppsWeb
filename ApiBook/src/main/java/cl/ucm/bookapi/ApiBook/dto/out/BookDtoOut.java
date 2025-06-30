package cl.ucm.bookapi.ApiBook.dto.out;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDtoOut {
    private Integer id;
    private String author;
    private String title;
    private String type;
    private Boolean available;
}
