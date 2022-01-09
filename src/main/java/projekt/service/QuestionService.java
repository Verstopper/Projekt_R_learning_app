package projekt.service;


import projekt.domain.Question;
import projekt.dto.RequestDto;

import java.util.List;


public interface QuestionService {

    Question addQuestion(RequestDto requestDto);

    void deleteQuestion(Integer questionId);

    Question getNextQuestion(Question question);

    List<Question> getAll(Integer id);
}
