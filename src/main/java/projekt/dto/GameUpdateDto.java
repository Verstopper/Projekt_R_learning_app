package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class GameUpdateDto {
    private int id;
    private String name;
    private String description;
}
