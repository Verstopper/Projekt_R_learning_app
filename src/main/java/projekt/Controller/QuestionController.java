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
    public ResponseEntity<Question> addQuestion(@RequestBody RequestDto requestDto) throws Exception {
        return ResponseEntity.ok(questionService.addQuestion(requestDto));
    }

    @PostMapping("/izbrisi")
    public ResponseEntity<Boolean> deleteQuestion(@RequestBody @NonNull Question question) throws Exception {
        return ResponseEntity.ok(questionService.deleteQuestion(question));
    }

    @PostMapping("/getNewQuestion")
    public ResponseEntity<Question> getNextQuestion(@RequestBody @NonNull Question question) throws Exception {
            return ResponseEntity.ok(questionService.getNextQuestion(question));
        }

        @PostMapping("getAll")
    public ResponseEntity<List<Question>> getAll(@RequestBody @NonNull Request idigre) throws Exception {
                return ResponseEntity.ok(questionService.getAll(idigre.getIdigre()));
        }


}
