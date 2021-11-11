package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Ucenik;

import java.util.Optional;

public interface UcenikRepository extends JpaRepository<Ucenik, Integer> {
    Optional<Ucenik> findByKorisnickoIme(String korisnickoIme);
}