package cl.ucm.bookapi.ApiBook.repository;

import cl.ucm.bookapi.ApiBook.entities.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {
    List<BookingEntity> findByUserFk(String email);
}
