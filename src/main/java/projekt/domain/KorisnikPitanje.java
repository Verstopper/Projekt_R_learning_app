package projekt.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;

@Table(name = "korisnik_pitanje")
@Entity
public class KorisnikPitanje {
    @EmbeddedId
    private KorisnikPitanjeId id;

    @Column(name = "\"početak_pitanje\"", nullable = false)
    private LocalDate početakPitanje;

    @Column(name = "kraj_pitanja", nullable = false)
    private LocalDate krajPitanja;

    public LocalDate getKrajPitanja() {
        return krajPitanja;
    }

    public void setKrajPitanja(LocalDate krajPitanja) {
        this.krajPitanja = krajPitanja;
    }

    public LocalDate getPočetakPitanje() {
        return početakPitanje;
    }

    public void setPočetakPitanje(LocalDate početakPitanje) {
        this.početakPitanje = početakPitanje;
    }

    public KorisnikPitanjeId getId() {
        return id;
    }

    public void setId(KorisnikPitanjeId id) {
        this.id = id;
    }
}