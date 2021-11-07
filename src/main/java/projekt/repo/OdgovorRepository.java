package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Odgovor;

public interface OdgovorRepository extends JpaRepository<Odgovor, String> {
}