package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Grade;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
    boolean existsByNameAndAndGeneration(String name, String generation);

}