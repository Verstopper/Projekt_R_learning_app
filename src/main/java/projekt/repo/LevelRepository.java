package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Game;
import projekt.domain.Level;

@Repository
public interface LevelRepository extends JpaRepository<Level, Integer> {
    boolean existsById(Integer id);
    Level findByName(Integer name);
    boolean existsByNameAndGame(Integer name, Game game);
}