package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import projekt.domain.Answer;
import projekt.domain.Question;
import projekt.dto.RequestDto;
import projekt.repo.AnswerRepository;
import projekt.repo.QuestionRepository;
import projekt.service.AnswerService;

@Service
@AllArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    AnswerRepository answerRepository;
    QuestionRepository questionRepository;

    @Override
    public Answer addAnswer(RequestDto requestDto) {
        Assert.notNull(requestDto,"Ne posotji objekt");
        Answer answer = new Answer();
        answer.setText(requestDto.getText());
        Question question = questionRepository.getById(requestDto.getQuestion());
        answer.setQuestion(question);
        answer.setCorrectness(requestDto.getCorrectness());
        if(!answerRepository.existsByTextAndQuestionAndCorrectness(answer.getText(),answer.getQuestion(),answer.getCorrectness())) {
            answerRepository.save(answer);
            return answer;
        }
        return  null;
    }

    @Override
    public boolean deleteAnswer(Answer answer) {
        if (!answerRepository.existsByTextAndQuestionAndCorrectness(answer.getText(), answer.getQuestion(), answer.getCorrectness()))
            return false;

        answerRepository.delete(answer);
        return true;
    }
}
