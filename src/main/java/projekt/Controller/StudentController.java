package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.service.StudentService;
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje")
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/ucenik/login")
    private ResponseEntity<String> login(@RequestBody String username){
        studentService.login(username);
        return ResponseEntity.ok("Učenik se uspješno ulogirao.");
    }
}
