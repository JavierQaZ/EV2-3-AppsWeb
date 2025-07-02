package cl.ucm.bookapi.ApiBook.repository;

import cl.ucm.bookapi.ApiBook.entities.FineEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FineRepository extends JpaRepository<FineEntity, Integer> {
    List<FineEntity> findByUserFk(String email);
}
