package projekt.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projekt.domain.Answer;
import projekt.dto.RequestDto;
import projekt.service.AnswerService;

@RestController
@AllArgsConstructor
@RequestMapping("/odgovor")
public class AnswerController {

    private AnswerService answerService;

    @PostMapping("/dodaj")
    public ResponseEntity<Answer> addQuestion(@RequestBody RequestDto requestDto){
        return ResponseEntity.ok(answerService.addAnswer(requestDto));
    }

    @PostMapping("/izbrisi")
    public ResponseEntity<Boolean> deleteQuestion(@RequestBody Answer answer) throws Exception {
        return ResponseEntity.ok(answerService.deleteAnswer(answer));
    }
}
