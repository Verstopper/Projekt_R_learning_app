package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import projekt.domain.Nivo;

public interface NivoRepository extends JpaRepository<Nivo, String>, JpaSpecificationExecutor<Nivo> {
}