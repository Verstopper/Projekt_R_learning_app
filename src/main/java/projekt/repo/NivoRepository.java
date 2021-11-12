package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Nivo;

public interface NivoRepository extends JpaRepository<Nivo, Integer> {
}