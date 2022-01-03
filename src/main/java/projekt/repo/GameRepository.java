package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Game;
import projekt.domain.Professor;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    boolean existsByName(String name);

    Optional<Game> findByName(String name);

    Game getById(Integer id);

    List<Game> findAllByProfessor(Professor professor);
}