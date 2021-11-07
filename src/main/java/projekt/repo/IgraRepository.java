package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import projekt.domain.Igra;

public interface IgraRepository extends JpaRepository<Igra, String>, JpaSpecificationExecutor<Igra> {
}