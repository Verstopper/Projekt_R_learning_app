package projekt.service;

import org.springframework.stereotype.Service;
import projekt.domain.Odgovor;
import projekt.domain.Request;

@Service
public interface OdgovroService {
    public Odgovor addAnswer(Request odgovor);



    public boolean deleteAnswer(Odgovor odgovor);



}
