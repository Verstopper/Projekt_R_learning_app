package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Game;
import projekt.domain.Level;
import projekt.domain.Question;
import projekt.dto.QuestionUpdateDto;
import projekt.dto.RequestDto;
import projekt.repo.GameRepository;
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
    private GameRepository gameRepository;

    @Override
    public Question addQuestion(RequestDto requestDto){
        Game game = gameRepository.getById(requestDto.getGame());
        Question question = Question.builder()
                .name(requestDto.getName())
                .text(requestDto.getText())
                .game(game)
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
    public  void  deleteAllQuestion(Integer gameId) {
        Game game = gameRepository.getById(gameId);
        List<Question> lista = questionRepository.getAllByGame(game);
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
        Game game = gameRepository.getById(id);
        return questionRepository.getAllByGame(game);
    }

    @Override
    public void updateQuestion(QuestionUpdateDto questionUpdateDto) {
        Question question = questionRepository.findById(questionUpdateDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji pitanje s id-em: " + questionUpdateDto.getId() + "."));

        question.setName(questionUpdateDto.getName());
        question.setText(questionUpdateDto.getText());

        questionRepository.save(question);
    }
}

