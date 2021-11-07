package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Pitanje;

public interface PitanjeRepository extends JpaRepository<Pitanje, String> {
}