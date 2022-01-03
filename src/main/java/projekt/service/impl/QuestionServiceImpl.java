package projekt.service.impl;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Level;
import projekt.domain.Question;
import projekt.dto.RequestDto;
import projekt.repo.LevelRepository;
import projekt.repo.QuestionRepository;
import projekt.service.QuestionService;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private QuestionRepository questionRepository;
    private LevelRepository levelRepository;

    public Question addQuestion(RequestDto requestDto) throws Exception {
        Question question = new Question();
        Level level = levelRepository.findByName(requestDto.getLevel());
        question.setName(requestDto.getName());
        question.setText(requestDto.getText());
        question.setLevel(level);

        if (questionRepository.existsByNameAndAndText(question.getName(), question.getText())) {
            throw new Exception("Postoji već identično pitanje");
        }

        questionRepository.save(question);

        return question;
    }

    @Override
    public boolean deleteQuestion(Question question) throws Exception {
        if (!questionRepository.existsById(question.getId())) return false;

        questionRepository.delete(question);
        return true;
    }

    @Override
    public Question getNextQuestion(Question question) {
        return null;
    }


    @Override
    public List<Question> getAll(Integer id) {
        Level level = levelRepository.findByName(id);
        return questionRepository.findAllByLevel(level);
    }
}

