package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Answer;
import projekt.domain.Question;
import projekt.dto.AnswerUpdateDto;
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
    public boolean addAnswer(AnswerUpdateDto requestDto) {
        Question question = questionRepository.findById(requestDto.getQuestion())
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji pitanje s id-em: " + requestDto.getQuestion() + "."));

        Answer answer = Answer.builder()
                .text(requestDto.getText())
                .question(question)
                .correctness(requestDto.getCorrectness())
                .build();
        Answer answer2 = Answer.builder()
                .text(requestDto.getText2())
                .question(question)
                .correctness(requestDto.getCorrectness2())
                .build();
        Answer answer3 = Answer.builder()
                .text(requestDto.getText3())
                .question(question)
                .correctness(requestDto.getCorrectness3())
                .build();
        Answer answer4 = Answer.builder()
                .text(requestDto.getText4())
                .question(question)
                .correctness(requestDto.getCorrectness4())
                .build();

        if(answerRepository.existsByTextAndQuestionAndCorrectness(answer.getText(),answer.getQuestion(),answer.getCorrectness()))
            throw new EntityExistsException("Već postoji takav odgovor.");

        if(answerRepository.existsByTextAndQuestionAndCorrectness(answer2.getText(),answer.getQuestion(),answer.getCorrectness()))
            throw new EntityExistsException("Već postoji takav odgovor.");

        if(answerRepository.existsByTextAndQuestionAndCorrectness(answer3.getText(),answer.getQuestion(),answer.getCorrectness()))
            throw new EntityExistsException("Već postoji takav odgovor.");

        if(answerRepository.existsByTextAndQuestionAndCorrectness(answer4.getText(),answer.getQuestion(),answer.getCorrectness()))
            throw new EntityExistsException("Već postoji takav odgovor.");
        answerRepository.save(answer);
        answerRepository.save(answer2);
        answerRepository.save(answer3);
        answerRepository.save(answer4);
        return true;
    }


    @Override
    public Integer getNumberOfAnswers(Integer id_question) {
        return answerRepository.countAnswerByQuestion(questionRepository.getById(id_question));
    }

    @Override
    public void deleteAnswer(Integer answerId) {
        if (!answerRepository.existsById(answerId))
            throw new EntityNotFoundException("Ne postoji odgovor s id-em: " + answerId + ".");

        answerRepository.deleteById(answerId);
    }

    @Override
    public  void deleteAllAnswers(Integer questionId) {
        Question question = questionRepository.getById(questionId);
        List<Answer> answers = answerRepository.findAllByQuestion(question).orElse(null);
        answerRepository.deleteAll(answers);
    }

    @Override
    public List<Answer> getAll(Integer questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji pitanje s id-em: " + questionId + "."));

        return answerRepository.findAllByQuestion(question).orElse(null);
    }

    @Override
    public void updateAnswer(AnswerUpdateDto answerUpdateDto) {
        Answer answer = answerRepository.findById(answerUpdateDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji odgovor s id-em: " + answerUpdateDto.getId() + "."));

        answer.setCorrectness(answerUpdateDto.getCorrectness());
        answer.setText(answerUpdateDto.getText());

        answerRepository.save(answer);
    }
}
