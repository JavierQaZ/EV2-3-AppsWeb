package cl.ucm.bookapi.ApiBook.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "copy_book")
@Getter
@Setter
public class CopyBookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_copybook")
    private Integer id;
    @Column(name = "book_fk")
    private Integer bookFk;
    private Boolean state;

    // Relaciones
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_fk",
                referencedColumnName = "id_book",
                insertable = false,
                updatable = false
    )
    private BookEntity bookEntity;
}
