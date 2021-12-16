package projekt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projekt.domain.Odgovor;
import projekt.domain.Request;
import projekt.repo.OdgovorRepository;
import projekt.service.OdgovroService;

@Service
public class OdgovorServiceImpl implements OdgovroService {


    @Autowired
    OdgovorRepository odgovorRepository;

    @Override
    public Odgovor addAnswer(Request odgovor) {
        return null;
    }

    @Override
    public boolean deleteAnswer(Odgovor odgovor) {
        boolean postoji = odgovorRepository.existsByTextAndAndTočnostAndAndIdPitanje(odgovor.getText(),odgovor.getTočnost(),odgovor.getIdPitanje());
        if(postoji) {
            odgovorRepository.delete(odgovor);

            return true;
        }else {
            return false;
        }
    }
}
