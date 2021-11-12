package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Profesor;

public interface ProfesorRepository extends JpaRepository<Profesor, String> {
}