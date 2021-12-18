package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projekt.domain.Answer;
import projekt.dto.RequestDto;
import projekt.repo.AnswerRepository;
import projekt.service.AnswerService;

@Service
@AllArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    AnswerRepository answerRepository;

    @Override
    public Answer addAnswer(RequestDto requestDto) {
        return null;
    }

    @Override
    public boolean deleteAnswer(Answer answer) {
        if (!answerRepository.existsByTextAndQuestionAndCorrectness(answer.getText(), answer.getQuestion(), answer.getCorrectness()))
            return false;

        answerRepository.delete(answer);
        return true;
    }
}
