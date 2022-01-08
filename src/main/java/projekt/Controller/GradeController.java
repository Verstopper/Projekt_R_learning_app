package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Student;
import projekt.dto.GradeAddDto;
import projekt.dto.StudentAddDto;
import projekt.service.GradeService;

import java.io.InvalidObjectException;
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje/razred")
public class GradeController {

    private final GradeService gradeService;

    @PostMapping
    public ResponseEntity<String> addGrade(@RequestBody GradeAddDto gradeAddDto) throws InvalidObjectException {
        if(gradeService.addGrade(gradeAddDto) == true ) {
            return ResponseEntity.ok("Razred uspješno dodan!");
        }
        else {
            return ResponseEntity.ok("Razred nije uspjesno dodan");
        }
    }

    @PostMapping("/{id}/dodajUcenika")
    public ResponseEntity<Student> addStudent(@RequestBody StudentAddDto studentAddDto, @PathVariable Integer id) throws Exception {
        return ResponseEntity.ok(gradeService.addStudent(studentAddDto));
    }
}
