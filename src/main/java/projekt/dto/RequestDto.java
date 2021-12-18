package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestDto {
    private String name;
    private String description;
    private String oib;
    private String text;
    private String level;
}
