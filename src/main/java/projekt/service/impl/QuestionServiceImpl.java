package projekt.service.impl;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Level;
import projekt.domain.Question;
import projekt.dto.RequestDto;
import projekt.repo.LevelRepository;
import projekt.repo.QuestionRepository;
import projekt.service.AnswerService;
import projekt.service.QuestionService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private QuestionRepository questionRepository;
    private LevelRepository levelRepository;
    private AnswerService answerService;

    @Override
    public Question addQuestion(RequestDto requestDto){
        Level level = levelRepository.getById(requestDto.getLevel());

        Question question = Question.builder()
                .name(requestDto.getName())
                .text(requestDto.getText())
                .level(level)
                .build();


        if (questionRepository.existsByNameAndAndText(question.getName(), question.getText()))
            throw new EntityExistsException("Postoji već identično pitanje");


        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Integer questionId) {
        if (!questionRepository.existsById(questionId))
            throw new EntityNotFoundException("Ne postoji pitanje s id-em: " + questionId + ".");

        questionRepository.deleteById(questionId);
    }

    @Override
    public  void  deleteAllQuestion(Integer leveId) {
        Level level = levelRepository.getById(leveId);
        List<Question> lista = questionRepository.getAllByLevel(level);
        for(var q :lista) {
            answerService.deleteAllAnswers(q.getId());
            questionRepository.delete(q);
        }
    }

    @Override
    public void deleteAllAnswersForQuestion(Integer idquestion) {
        Question question = questionRepository.getById(idquestion);
        answerService.deleteAllAnswers(idquestion);
        questionRepository.delete(question);
    }

    @Override
    public Question getNextQuestion(Question question) {
        return null;
    }


    @Override
    public List<Question> getAll(Integer id) {
        Level level = levelRepository.getById(id);

        return questionRepository.getAllByLevel(level);
    }
}

