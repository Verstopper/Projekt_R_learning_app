package projekt.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "profesor")
public class Profesor {
    @Id
    @Column(name = "oib", nullable = false, length = 10)
    private String id;

    @Column(name = "korisnicko_ime", nullable = false, length = 100)
    private String korisnickoIme;

    @Column(name = "lozinka", nullable = false, length = 100)
    private String lozinka;

    @Column(name = "ime_i_prezime", nullable = false, length = 100)
    private String imeIPrezime;

    @Column(name = "email", length = 1000)
    private String email;
}