package projekt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projekt.domain.Ucenik;
import projekt.service.UcenikService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje")
public class UcenikController {

    private final UcenikService ucenikService;

    @PostMapping("/Ucenik/login")
    private ResponseEntity<Ucenik> login(@RequestBody String korisnickoIme){
        return new ResponseEntity<>(ucenikService.login(korisnickoIme), HttpStatus.OK);
    }
}
