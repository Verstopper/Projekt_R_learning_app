package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Game;
import projekt.domain.Request;
import projekt.dto.StudentAddDto;
import projekt.service.StudentService;

import java.util.List;

@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje")
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/ucenik/login")
    public ResponseEntity<String> login(@RequestBody Request username){
        studentService.login(username.getUsername());
        return ResponseEntity.ok("Učenik se uspješno ulogirao.");
    }

    @PostMapping("/ucenik/allGame")
    public ResponseEntity<List<Game>> getAllGames(@RequestBody Request username) {
        return ResponseEntity.ok(studentService.getAllGames(username.getUsername()));
    }

    @PostMapping("/dodajUcenika")
    public ResponseEntity addStudent(@RequestBody StudentAddDto studentAddDto) {
        studentService.addStudent(studentAddDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/obrisiUcenika")
    public ResponseEntity<String> deleteStudent(@RequestBody int studentId){
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok("Učenik uspješno izbrisan.");
    }
}
