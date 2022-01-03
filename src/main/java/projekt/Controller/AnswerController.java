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
    public ResponseEntity<Answer> addQuestion(@RequestBody @NonNull RequestDto requestDto){
        return ResponseEntity.ok(answerService.addAnswer(requestDto));
    }

    @PostMapping("/izbrisi")
    public ResponseEntity<Boolean> deleteQuestion(@RequestBody @NonNull  Answer answer) throws Exception {
        return ResponseEntity.ok(answerService.deleteAnswer(answer));
    }

    @PostMapping("/getAllAnswers")
    public ResponseEntity<List<Answer>> getAllAnswers(@RequestBody @NonNull Request idpitanje) throws Exception {
        return ResponseEntity.ok(answerService.getAll(idpitanje.getIdpitanje()));
    }
}
