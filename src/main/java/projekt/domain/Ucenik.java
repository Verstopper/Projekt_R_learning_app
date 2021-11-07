package projekt.domain;

import javax.persistence.*;

@Table(name = "ucenik")
@Entity
public class Ucenik {
    @Id
    @Column(name = "id_ucenik", nullable = false, length = 10)
    private String id;

    @Column(name = "korisnicko_ime", nullable = false, length = 100)
    private String korisnickoIme;

    @Column(name = "puno_ime_i_prezime", nullable = false, length = 100)
    private String punoImeIPrezime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_razred", nullable = false)
    private Razred idRazred;

    public Razred getIdRazred() {
        return idRazred;
    }

    public void setIdRazred(Razred idRazred) {
        this.idRazred = idRazred;
    }

    public String getPunoImeIPrezime() {
        return punoImeIPrezime;
    }

    public void setPunoImeIPrezime(String punoImeIPrezime) {
        this.punoImeIPrezime = punoImeIPrezime;
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public void setKorisnickoIme(String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}