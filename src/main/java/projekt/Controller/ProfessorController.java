package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;
import projekt.service.ProfessorService;


@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje")
public class ProfessorController {

    private final ProfessorService professorService;

    @GetMapping("/Hello")
    public String hello(){
        return "hello!";
    }

    @PostMapping("/registracija")
    public ResponseEntity<String> register(@RequestBody RegistrationDto registrationDto){
        professorService.register(registrationDto);
        return ResponseEntity.ok("Uspješna registracija.");
    }

    @PostMapping("/profesor/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        professorService.login(loginDto);
        return ResponseEntity.ok("Uspješan login.");
    }

}
