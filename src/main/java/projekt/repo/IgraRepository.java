package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Igra;

public interface IgraRepository extends JpaRepository<Igra, Integer> {
}