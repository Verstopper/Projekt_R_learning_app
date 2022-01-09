package projekt.service;

import org.springframework.stereotype.Service;
import projekt.domain.Answer;
import projekt.dto.RequestDto;

import java.util.List;

@Service
public interface AnswerService {
    Answer addAnswer(RequestDto answer);

    List<Answer> getAll(Integer questionId);

    void deleteAnswer(Integer answer);


}
