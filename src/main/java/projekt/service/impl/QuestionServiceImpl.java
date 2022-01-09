package projekt.service.impl;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Level;
import projekt.domain.Question;
import projekt.dto.RequestDto;
import projekt.repo.LevelRepository;
import projekt.repo.QuestionRepository;
import projekt.service.QuestionService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private QuestionRepository questionRepository;
    private LevelRepository levelRepository;

    @Override
    public Question addQuestion(RequestDto requestDto){
        Level level = levelRepository.getByName(requestDto.getLevel());

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
    public Question getNextQuestion(Question question) {
        return null;
    }


    @Override
    public List<Question> getAll(Integer id) {
        Level level = levelRepository.getByName(id);
        return questionRepository.findAllByLevel(level);
    }
}

