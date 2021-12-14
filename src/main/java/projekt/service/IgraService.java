package projekt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import projekt.domain.Igra;
import projekt.domain.Request;
import projekt.repo.IgraRepository;
import projekt.repo.ProfesorRepository;

@Service
public class IgraService {

    @Autowired
    IgraRepository igrarepo;

    @Autowired
    ProfesorRepository profRepo;

    public Igra addGame(Request igra) throws Exception {
        Assert.notNull(igra,"Objekt ne posotji");
        boolean exists = igrarepo.existsByNaziv(igra.getNaziv());
        if(!exists) {
            Igra igra_nova = new Igra();
            igra_nova.setNaziv(igra.getNaziv());
            igra_nova.setOpis(igra.getOpis());
            igra_nova.setOib(profRepo.findProfesorById(igra.getOib()));

            igrarepo.save(igra_nova);

            return igra_nova;
        }else {
            throw new Exception("Igra istog imena već postoji!");
        }


    }

    public boolean deleteGame(Igra igra) {
        boolean bool = igrarepo.existsById((igra.getId()));
    if (bool) {
        igrarepo.delete(igra);
        return true;
    }else {
        return false;
    }


    }
}
