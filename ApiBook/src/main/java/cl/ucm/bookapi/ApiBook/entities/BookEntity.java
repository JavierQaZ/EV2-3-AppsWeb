package cl.ucm.bookapi.ApiBook.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "book")
@Getter
@Setter

public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_book")
    private Integer id;
    private String author;
    private String title;
    private String type;
    @Lob
    private Byte[] image64;
}