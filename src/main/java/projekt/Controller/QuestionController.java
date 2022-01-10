package projekt.Controller;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projekt.domain.Question;
import projekt.domain.Request;
import projekt.dto.RequestDto;

import projekt.service.QuestionService;

import java.util.List;

@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/request")
public class QuestionController {

    private QuestionService questionService;

    @PostMapping("/dodaj")
    public ResponseEntity<Question> addQuestion(@RequestBody RequestDto requestDto)  {
        return ResponseEntity.ok(questionService.addQuestion(requestDto));
    }

    @PostMapping("/izbrisi")
    public ResponseEntity<String> deleteQuestion(@RequestBody Request questionId) {
        questionService.deleteAllAnswersForQuestion(questionId.getIdpitanje());
        return ResponseEntity.ok("Pitanje uspješno izbrisano.");
    }

    @PostMapping("/getNewQuestion")
    public ResponseEntity<Question> getNextQuestion(@RequestBody @NonNull Question question) {
            return ResponseEntity.ok(questionService.getNextQuestion(question));
        }

        @PostMapping("getAll")
    public ResponseEntity<List<Question>> getAll(@RequestBody @NonNull Request idigre) throws Exception {
                List<Question> questions = questionService.getAll(idigre.getIdigre());
                if(questions.isEmpty()) {
                    return  null;
                }
        return ResponseEntity.ok(questions);
        }


}
