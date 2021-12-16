package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RegistrationDto {
    private String id;
    private String imeIPrezime;
    private String korisnickoIme;
    private String email;
    private String lozinka;
}
