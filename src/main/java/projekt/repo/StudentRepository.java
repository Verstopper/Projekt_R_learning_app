package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Boolean existsByUsername(String username);
    Student findByUsername(String username);
}