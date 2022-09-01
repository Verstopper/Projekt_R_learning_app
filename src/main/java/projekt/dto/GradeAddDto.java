package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class GradeAddDto {
    private String name;
    private String generation;
    private String username;
}
