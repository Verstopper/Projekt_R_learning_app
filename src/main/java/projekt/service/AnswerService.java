package projekt.service;

import org.springframework.stereotype.Service;
import projekt.domain.Answer;
import projekt.dto.AnswerUpdateDto;
import projekt.dto.RequestDto;

import java.util.List;

@Service
public interface AnswerService {
    boolean addAnswer(AnswerUpdateDto answer);

    List<Answer> getAll(Integer questionId);

    void deleteAnswer(Integer answer);

    Integer getNumberOfAnswers(Integer id_question);

    void deleteAllAnswers(Integer idQuestion);

    void updateAnswer(AnswerUpdateDto answerUpdateDto);
}
