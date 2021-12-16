package projekt.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projekt.domain.Odgovor;
import projekt.domain.Request;
import projekt.service.OdgovroService;

@RestController
@RequestMapping("/odgovor")
public class OdgovorController {

    @Autowired
    private OdgovroService odgovroService;

    @PostMapping("/dodaj")
    public Odgovor addQuestion(@RequestBody Request odgovor) throws Exception {

        return odgovroService.addAnswer(odgovor);
    }

    @PostMapping("/izbrisi")
    public boolean deleteQuestion(@RequestBody Odgovor odgovor) throws Exception {

        return odgovroService.deleteAnswer(odgovor);
    }
}
