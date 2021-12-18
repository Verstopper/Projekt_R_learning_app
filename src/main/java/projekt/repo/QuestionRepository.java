package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    boolean existsByNameAndAndText(String name, String text);


}
