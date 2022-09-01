package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Grade;

import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
    boolean existsByNameAndAndGeneration(String name, String generation);
    Grade getGradeByName(String name);
    Optional<Grade> findByName(String grade);
}