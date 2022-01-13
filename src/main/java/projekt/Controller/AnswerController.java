package projekt.Controller;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Answer;
import projekt.domain.Request;
import projekt.dto.AnswerUpdateDto;
import projekt.service.AnswerService;

import java.util.List;

@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/odgovor")
public class AnswerController {

    private AnswerService answerService;

    @PostMapping("/dodaj")
    public ResponseEntity<Boolean> addAllAnswer(@RequestBody @NonNull AnswerUpdateDto requestDto){
        return ResponseEntity.ok(answerService.addAnswer(requestDto));
    }

    @PostMapping("/getNumberOfAnswers")
    public ResponseEntity<Integer> getNumberOfAnswers(@RequestBody @NonNull Request request){
        return ResponseEntity.ok(answerService.getNumberOfAnswers(request.getId_question()));
    }



    @PostMapping("/izbrisi")
    public ResponseEntity<String> deleteAnswer(@RequestBody @NonNull Request answerId) {
        answerService.deleteAnswer(answerId.getId_question());
        return ResponseEntity.ok("Uspješno obrisan odgovor.");
    }

    @PostMapping("/getAllAnswers")
    public ResponseEntity<List<Answer>> getAllAnswers(@RequestBody @NonNull Request questionId){
        return ResponseEntity.ok(answerService.getAll(questionId.getIdigre()));
    }

    @PostMapping("/uredi")
    public ResponseEntity<String> updateAnswer(@RequestBody AnswerUpdateDto answerUpdateDto){
        answerService.updateAnswer(answerUpdateDto);
        return ResponseEntity.ok("Uspješno uređen odgovor.");
    }
}
