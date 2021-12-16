package projekt.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Korisnik {
    private String korisnickoIme;
    private String lozinka;
    private Uloga uloga;
}
