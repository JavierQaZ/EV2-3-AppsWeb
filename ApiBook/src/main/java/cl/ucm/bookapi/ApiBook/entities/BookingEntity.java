package cl.ucm.bookapi.ApiBook.entities;

import cl.ucm.bookapi.ApiBook.dto.out.BookingDtoOut;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "booking")
@Getter
@Setter
public class BookingEntity extends BookingDtoOut {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_booking")
    private Integer id;
    @Column(name = "copybook_fk")
    private Integer copybookFk;
    @Column(name = "date_booking")
    private LocalDate dateBooking;
    @Column(name = "date_return")
    private LocalDate dateReturn;
    private Boolean state;
    @Column(name = "user_fk")
    private String userFk;

    // Relaciones
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "copybook_fk",
                referencedColumnName = "id_copybook",
                insertable = false,
                updatable = false
    )
    private CopyBookEntity copyBookEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_fk",
                referencedColumnName = "email",
                insertable = false,
                updatable = false
    )
    private UserEntity userEntity;


}