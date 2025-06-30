package cl.ucm.bookapi.ApiBook.repository;

import cl.ucm.bookapi.ApiBook.entities.CopyBookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CopyBookRepository extends JpaRepository<CopyBookEntity, Integer> {
    List<CopyBookEntity> findByBookFkAndStateTrue(int id);
}
