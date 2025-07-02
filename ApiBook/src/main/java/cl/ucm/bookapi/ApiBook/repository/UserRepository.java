package cl.ucm.bookapi.ApiBook.repository;

import cl.ucm.bookapi.ApiBook.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
}
