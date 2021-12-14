package projekt.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Igra;
import projekt.domain.Profesor;
import projekt.domain.Request;
import projekt.service.IgraService;

import java.util.Optional;

@RestController
@RequestMapping("/igra")
public class IgraController {

    @Autowired
    private IgraService igraService;



    @PostMapping("/dodaj")
    public Igra addGame(@RequestBody Request igra) throws Exception {
        Assert.notNull(igra,"Objekt je prazan");
       return igraService.addGame(igra);
    }

    @PostMapping("/brisi")
    public boolean deleteGame(@RequestBody Igra igra) throws Exception {
        Assert.notNull(igra,"Objekt je prazan");
        boolean ig = igraService.deleteGame(igra);
        if(ig) {
            return true;
        }else {
            return  false;
        }
    }
}
