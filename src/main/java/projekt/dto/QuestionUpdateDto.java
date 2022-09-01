package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class QuestionUpdateDto {
    private Integer id;
    private String name;
    private String text;
}
