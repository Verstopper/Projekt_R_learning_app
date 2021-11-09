package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Ucenik;

public interface UcenikRepository extends JpaRepository<Ucenik, Integer> {
}