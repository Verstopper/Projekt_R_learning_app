package projekt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projekt.domain.Profesor;
import projekt.service.ProfesorService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje")
public class ProfesorController {

    private final ProfesorService profesorService;

    @PostMapping("/registracija")
    public ResponseEntity<Profesor> register(@RequestBody Profesor profesor){
        return new ResponseEntity<>(profesorService.register(profesor), HttpStatus.CREATED);
    }

    @PostMapping("/profesor/login")
    public ResponseEntity<Profesor> login(@RequestBody String korisnickoIme, @RequestBody String lozinka){
        return new ResponseEntity<>(profesorService.login(korisnickoIme, lozinka), HttpStatus.OK);
    }

}
