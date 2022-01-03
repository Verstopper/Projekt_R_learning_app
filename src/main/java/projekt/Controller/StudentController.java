package projekt.Controller;

import lombok.AllArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Student;
import projekt.dto.AuthenticationResponseDto;
import projekt.service.StudentService;
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje")
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/ucenik/login")
    private ResponseEntity<AuthenticationResponseDto> login(@RequestBody String username){
        return ResponseEntity.ok(studentService.login(username));
    }
}
