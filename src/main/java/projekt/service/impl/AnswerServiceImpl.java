package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Answer;
import projekt.domain.Question;
import projekt.dto.RequestDto;
import projekt.repo.AnswerRepository;
import projekt.repo.QuestionRepository;
import projekt.service.AnswerService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@AllArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    AnswerRepository answerRepository;
    QuestionRepository questionRepository;

    @Override
    public Answer addAnswer(RequestDto requestDto) {
        Question question = questionRepository.findById(requestDto.getQuestion())
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji pitanje s id-em: " + requestDto.getQuestion() + "."));

        Answer answer = Answer.builder()
                .text(requestDto.getText())
                .question(question)
                .correctness(requestDto.getCorrectness())
                .build();

        if(answerRepository.existsByTextAndQuestionAndCorrectness(answer.getText(),answer.getQuestion(),answer.getCorrectness()))
            throw new EntityExistsException("Već postoji takav odgovor.");

        return  answerRepository.save(answer);
    }

    @Override
    public void deleteAnswer(Integer answerId) {
        if (!answerRepository.existsById(answerId))
            throw new EntityNotFoundException("Ne postoji odgovor s id-em: " + answerId + ".");

        answerRepository.deleteById(answerId);
    }

    @Override
    public List<Answer> getAll(Integer questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji pitanje s id-em: " + questionId + "."));

        return answerRepository.findAllByQuestion(question);
    }
}
