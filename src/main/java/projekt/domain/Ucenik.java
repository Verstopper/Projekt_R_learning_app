package projekt.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "ucenik")
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Ucenik {
    @Id
    @Column(name = "id_ucenik", nullable = false)
    private Integer id;

    @Column(name = "korisnicko_ime", nullable = false, length = 100)
    private String korisnickoIme;

    @Column(name = "puno_ime_i_prezime", nullable = false, length = 100)
    private String punoImeIPrezime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_razred", nullable = false)
    private Razred idRazred;
}