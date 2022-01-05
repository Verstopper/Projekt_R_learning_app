package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RegistrationDto {
    private String oib;
    private String fullName;
    private String username;
    private String email;
    private String password;
}
