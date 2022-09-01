package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.dto.GradeAddDto;
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
        gradeService.addGrade(gradeAddDto);
        return ResponseEntity.ok("Razred uspješno dodan :)");
    }

    @PostMapping("/uredi")
    public ResponseEntity<String> updateGrade(@RequestBody GradeAddDto gradeAddDto, int gradeId){
        gradeService.updateGrade(gradeAddDto, gradeId);
        return ResponseEntity.ok("Razred uspješno uređen.");
    }

    @PostMapping("/obrisi")
    public ResponseEntity<String> deleteGrade(@RequestBody int gradeId){
        gradeService.deleteGrade(gradeId);
        return ResponseEntity.ok("Razred uspješno obrisan.");
    }

}
