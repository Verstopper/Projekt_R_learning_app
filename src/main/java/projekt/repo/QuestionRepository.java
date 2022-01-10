package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Level;
import projekt.domain.Question;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    boolean existsByNameAndAndText(String name, String text);

    List<Question> getAllByLevel(Level id);

    Question getById(Integer id);


}
