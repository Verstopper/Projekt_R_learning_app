package projekt.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projekt.domain.Igra;
import projekt.domain.Pitanje;
import projekt.domain.Request;
import projekt.service.IgraService;
import projekt.service.PItanjeService;

@RestController
@RequestMapping("/pitanje")
public class PitanjeContoller {


    @Autowired
    private PItanjeService pItanjeService;



    @PostMapping("/dodaj")
    public Pitanje addGame(@RequestBody Request pitanje) throws Exception {
        Assert.notNull(pitanje,"Objekt je prazan");
        return pItanjeService.addQuestion(pitanje);
    }


}
