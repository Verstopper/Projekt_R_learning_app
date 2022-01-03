package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Student;
import projekt.dto.GradeAddDto;
import projekt.dto.StudentAddDto;
import projekt.service.GradeService;

import java.io.InvalidObjectException;

@RestController
@AllArgsConstructor
@RequestMapping("/api/ZabavnoUcenje/razred")
public class GradeController {

    private final GradeService gradeService;

    @PostMapping
    public ResponseEntity<Integer> addGrade(@RequestBody GradeAddDto gradeAddDto) throws InvalidObjectException {
        return ResponseEntity.ok(gradeService.addGrade(gradeAddDto));
    }

    @PostMapping("/{id}/dodajUcenika")
    public ResponseEntity<Student> addStudent(@RequestBody StudentAddDto studentAddDto, @PathVariable Integer id) throws InvalidObjectException {
        return ResponseEntity.ok(gradeService.addStudent(id, studentAddDto));
    }
}
