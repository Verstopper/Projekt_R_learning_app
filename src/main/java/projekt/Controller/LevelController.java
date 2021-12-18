package projekt.Controller;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projekt.domain.Grade;
import projekt.domain.Level;
import projekt.dto.RequestDto;
import projekt.service.LevelService;

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
