package projekt.domain;

import lombok.*;

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


}