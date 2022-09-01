package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class AnswerUpdateDto {
    private Integer id;
    private Integer question;
    private String correctness;
    private String text;
    private String correctness2;
    private String text2;
    private String correctness3;
    private String text3;
    private String correctness4;
    private String text4;

}
