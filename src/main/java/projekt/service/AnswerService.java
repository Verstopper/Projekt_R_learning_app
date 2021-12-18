package projekt.service;

import org.springframework.stereotype.Service;
import projekt.domain.Answer;
import projekt.dto.RequestDto;

@Service
public interface AnswerService {
    public Answer addAnswer(RequestDto odgovor);



    public boolean deleteAnswer(Answer answer);



}
