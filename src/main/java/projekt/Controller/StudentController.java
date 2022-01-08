package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Game;
import projekt.domain.Request;
import projekt.service.StudentService;

import java.util.List;

@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje")
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/ucenik/login")
    private ResponseEntity<String> login(@RequestBody Request username){
        studentService.login(username.getUsername());
        return ResponseEntity.ok("Učenik se uspješno ulogirao.");
    }

    @PostMapping("/ucenik/allGame")
    private ResponseEntity<List<Game>> getAllGames(@RequestBody Request username) {
        return ResponseEntity.ok(studentService.getAllGames(username.getUsername()));
    }
}
