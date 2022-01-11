package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class AnswerUpdateDto {
    private Integer id;
    private String correctness;
    private String text;
}
