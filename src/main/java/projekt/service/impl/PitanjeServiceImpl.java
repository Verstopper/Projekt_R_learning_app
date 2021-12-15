package projekt.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import projekt.domain.Nivo;
import projekt.domain.Pitanje;
import projekt.domain.Request;
import projekt.repo.NivoRepository;
import projekt.repo.PitanjeRepository;
import projekt.service.PItanjeService;

import java.io.Console;
import java.io.Writer;
import java.util.Optional;

@Service
public class PitanjeServiceImpl implements PItanjeService {



    @Autowired
    private PitanjeRepository pitanjeRepo;

    @Autowired
    private NivoRepository nivoRepo;

    public Pitanje addQuestion(Request pitanje) throws Exception {

        Pitanje pitanje1 = new Pitanje();
        pitanje1.setNaziv(pitanje.getNaziv());
        pitanje1.setText(pitanje.getText());
        Nivo nivo1 = nivoRepo.findByNaziv(pitanje.getNivo());
        pitanje1.setIdNivo(nivo1);
        boolean postoji2 = pitanjeRepo.existsByNazivAndAndText(pitanje1.getNaziv(),pitanje1.getText());
        if(!postoji2) {
            pitanjeRepo.save(pitanje1);
            return pitanje1;
        } else {
            throw new Exception("Posotji već identicno pitanje");
        }
    }

    @Override
    public boolean deleteQuestion(Pitanje pitanje) throws Exception {
        Assert.notNull(pitanje,"NE postoji objekt");
        if(pitanjeRepo.existsById(pitanje.getId())) {
            pitanjeRepo.delete(pitanje);
            return true;
        }else {

            return false;
        }

    }


}

