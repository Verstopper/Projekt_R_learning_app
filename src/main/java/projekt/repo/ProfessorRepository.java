package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.domain.Professor;

import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, String> {

    Professor findProfessorById(String id);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<Professor> findByUsernameAndPassword(String username, String password);
    Professor findByUsername(String username);
    boolean existsByUsernameAndPassword(String username, String password);
}