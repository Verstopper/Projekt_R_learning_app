package projekt.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projekt.domain.Pitanje;
import projekt.domain.Request;

import projekt.service.PItanjeService;

@RestController
@RequestMapping("/pitanje")
public class PitanjeContoller {


    @Autowired
    private PItanjeService pItanjeService;



    @PostMapping("/dodaj")
    public Pitanje addQuestion(@RequestBody Request pitanje) throws Exception {

        return pItanjeService.addQuestion(pitanje);
    }

    @PostMapping("/izbrisi")
    public boolean deleteQuestion(@RequestBody Pitanje pitanje) throws Exception {

        return pItanjeService.deleteQuestion(pitanje);
    }



}
