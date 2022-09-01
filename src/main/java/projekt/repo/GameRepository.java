package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import projekt.domain.Game;
import projekt.domain.Professor;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    boolean existsByName(String name);

    Optional<Game> findByName(String name);

    List<Game> findAllByProfessor(Professor professor);

    boolean existsByProfessor(Professor professor);


    @Transactional
    @Modifying
    @Query("UPDATE Game SET name = :name WHERE id = :id")
    void updateName(@Param("name") String name, @Param("id") Integer id);

    @Transactional
    @Modifying
    @Query("UPDATE Game SET description = :description WHERE id = :id")
    void updateDescription(@Param("description") String description, @Param("id") Integer id);
}

