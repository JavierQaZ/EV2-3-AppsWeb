package cl.ucm.bookapi.ApiBook.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_rol")
@Getter
@Setter
public class UserRolEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol_user")
    private Integer id;
    @Column(name = "rol_fk")
    private Integer rolFk;
    @Column(name = "user_fk")
    private String userFk;

    // Relaciones
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rol_fk",
                referencedColumnName = "id_rol",
                insertable = false,
                updatable = false
    )
    private RolEntity rolEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_fk",
                referencedColumnName = "email",
                insertable = false,
                updatable = false
    )
    private UserEntity userEntity;
}
