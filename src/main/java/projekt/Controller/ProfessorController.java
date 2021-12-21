package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Professor;
import projekt.dto.AuthenticationResponseDto;
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
    public ResponseEntity<Professor> register(@RequestBody RegistrationDto registrationDto){
        return new ResponseEntity<>(professorService.register(registrationDto), HttpStatus.CREATED);
    }

    @PostMapping("/profesor/login")
    public ResponseEntity<AuthenticationResponseDto> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(professorService.login(loginDto));
    }

}
