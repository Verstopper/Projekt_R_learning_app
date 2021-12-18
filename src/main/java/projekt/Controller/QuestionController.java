package projekt.Controller;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projekt.domain.Question;
import projekt.dto.RequestDto;

import projekt.service.QuestionService;

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



}
