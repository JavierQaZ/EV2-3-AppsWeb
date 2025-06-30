package cl.ucm.bookapi.ApiBook.repository;

import cl.ucm.bookapi.ApiBook.entities.UserRolEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRolRepository extends JpaRepository<UserRolEntity, Integer> {
    List<UserRolEntity> findByUserFk(String email);
}
