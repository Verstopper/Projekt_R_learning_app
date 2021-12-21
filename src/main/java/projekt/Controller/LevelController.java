package projekt.Controller;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Grade;
import projekt.domain.Level;
import projekt.dto.RequestDto;
import projekt.service.LevelService;
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/level")
public class LevelController {


    LevelService gradeService;
    @PostMapping("/add")
    public ResponseEntity<Level> addLevel(@RequestBody @NonNull RequestDto requestDto) throws Exception {
        return ResponseEntity.ok(gradeService.addLevel(requestDto));
    }

    @PostMapping("/delete")
    public ResponseEntity<Boolean> deleteLevel(@RequestBody @NonNull Level level) throws Exception {
        return ResponseEntity.ok(gradeService.deleteLevel(level));
    }
}
