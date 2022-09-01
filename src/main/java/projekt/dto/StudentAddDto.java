package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class StudentAddDto {
    private String username;
    private String fullName;
    private String gradeName;
}
