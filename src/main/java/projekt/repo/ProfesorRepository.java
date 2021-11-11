package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Profesor;

import java.util.Optional;

public interface ProfesorRepository extends JpaRepository<Profesor, String> {

    Profesor findProfesorById(String id);
    boolean existsByKorisnickoIme(String korisnickoIme);
    boolean existsByEmail(String email);
    Optional<Profesor> findByKorisnickoImeAndLozinka(String korisnickoIme, String lozinka);
}