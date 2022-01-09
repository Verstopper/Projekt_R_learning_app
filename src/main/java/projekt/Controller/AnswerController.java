package projekt.Controller;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Answer;
import projekt.domain.Request;
import projekt.dto.RequestDto;
import projekt.service.AnswerService;

import java.util.List;

@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/odgovor")
public class AnswerController {

    private AnswerService answerService;

    @PostMapping("/dodaj")
    public ResponseEntity<Answer> addAnswer(@RequestBody @NonNull RequestDto requestDto){
        return ResponseEntity.ok(answerService.addAnswer(requestDto));
    }

    @PostMapping("/izbrisi")
    public ResponseEntity<String> deleteAnswer(@RequestBody @NonNull Integer answerId) {
        answerService.deleteAnswer(answerId);
        return ResponseEntity.ok("Uspješno obrisan odgovor.");
    }

    @PostMapping("/getAllAnswers")
    public ResponseEntity<List<Answer>> getAllAnswers(@RequestBody @NonNull Integer questionId){
        return ResponseEntity.ok(answerService.getAll(questionId));
    }
}
