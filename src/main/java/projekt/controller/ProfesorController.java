package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Profesor;
import projekt.dto.AuthenticationResponseDto;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;
import projekt.service.ProfesorService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje")
public class ProfesorController {

    private final ProfesorService profesorService;

    @PostMapping("/registracija")
    public ResponseEntity<Profesor> register(@RequestBody RegistrationDto registrationDto){
        return new ResponseEntity<>(profesorService.register(registrationDto), HttpStatus.CREATED);
    }

    @PostMapping("/profesor/login")
    public ResponseEntity<AuthenticationResponseDto> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(profesorService.login(loginDto));
    }

}
