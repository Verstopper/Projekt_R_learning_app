package projekt.domain;

import javax.persistence.*;

@Table(name = "odgovor")
@Entity
public class Odgovor {
    @Id
    @Column(name = "id_odgovr", nullable = false, length = 10)
    private String id;

    @Lob
    @Column(name = "\"točnost\"", nullable = false)
    private String točnost;

    @Lob
    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "vodi_na", nullable = false, length = 10)
    private String vodiNa;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_pitanje", nullable = false)
    private Pitanje idPitanje;

    public Pitanje getIdPitanje() {
        return idPitanje;
    }

    public void setIdPitanje(Pitanje idPitanje) {
        this.idPitanje = idPitanje;
    }

    public String getVodiNa() {
        return vodiNa;
    }

    public void setVodiNa(String vodiNa) {
        this.vodiNa = vodiNa;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTočnost() {
        return točnost;
    }

    public void setTočnost(String točnost) {
        this.točnost = točnost;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}