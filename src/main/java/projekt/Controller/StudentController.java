package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Student;
import projekt.service.StudentService;
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje")
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/ucenik/login")
    private ResponseEntity<Student> login(@RequestBody String username){
        return ResponseEntity.ok(studentService.login(username));
    }
}
