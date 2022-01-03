package projekt.service;

import org.springframework.stereotype.Service;
import projekt.domain.Answer;
import projekt.domain.Question;
import projekt.dto.RequestDto;

import java.util.List;

@Service
public interface AnswerService {
    public Answer addAnswer(RequestDto odgovor);

    List<Answer> getAll(Integer idpitanja);

    public boolean deleteAnswer(Answer answer);



}
