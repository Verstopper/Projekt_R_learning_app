package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Answer;
import projekt.domain.Question;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    boolean existsByTextAndQuestionAndCorrectness(String text, Question question, String correctness);
    List<Answer> findAllByQuestion(Question q);


}