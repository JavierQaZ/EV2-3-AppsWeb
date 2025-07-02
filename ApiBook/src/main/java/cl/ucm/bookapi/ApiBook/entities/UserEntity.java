package cl.ucm.bookapi.ApiBook.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
public class UserEntity {
    @Id
    private String email;
    @Column(name = "last_name")
    private String lastName;
    private String name;
    private String password;
    private Boolean state;
}