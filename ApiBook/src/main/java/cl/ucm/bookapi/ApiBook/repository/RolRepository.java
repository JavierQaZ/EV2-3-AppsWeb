package cl.ucm.bookapi.ApiBook.repository;

import cl.ucm.bookapi.ApiBook.entities.RolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<RolEntity, Integer> {
    Optional<RolEntity> findByName(String name);
}
