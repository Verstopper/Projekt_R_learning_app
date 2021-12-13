package projekt.domain;

import javax.persistence.*;

@Table(name = "ucenik")
@Entity

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