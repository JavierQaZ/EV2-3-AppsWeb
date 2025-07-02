package cl.ucm.bookapi.ApiBook.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "fine")
@Getter
@Setter
public class FineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fine")
    private Integer id;
    private Integer amount;
    private String description;
    private Boolean state;
    @Column(name = "user_fk")
    private String userFk;

    // Relaciones
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_fk",
            referencedColumnName = "email",
            insertable = false,
            updatable = false
    )
    private UserEntity userEntity;
}