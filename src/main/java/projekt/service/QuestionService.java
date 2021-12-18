package projekt.service;


import projekt.domain.Question;
import projekt.dto.RequestDto;


public interface QuestionService {

    public Question addQuestion(RequestDto requestDto) throws Exception;

    boolean deleteQuestion(Question request) throws Exception;

    Question getNextQuestion(Question question);
}
