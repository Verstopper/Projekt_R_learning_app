package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Razred;

public interface RazredRepository extends JpaRepository<Razred, String> {
}