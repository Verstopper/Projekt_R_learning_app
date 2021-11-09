package projekt.domain;

import javax.persistence.*;

@Table(name = "odgovor")
@Entity
public class Odgovor {
    @Id
    @Column(name = "id_odgovr", nullable = false)
    private Integer id;

    @Column(name = "\"točnost\"", nullable = false, length = 100)
    private String točnost;

    @Column(name = "text", nullable = false, length = 1000)
    private String text;

    @Column(name = "vodi_na", nullable = false)
    private Integer vodiNa;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_pitanje", nullable = false)
    private Pitanje idPitanje;

    public Pitanje getIdPitanje() {
        return idPitanje;
    }

    public void setIdPitanje(Pitanje idPitanje) {
        this.idPitanje = idPitanje;
    }

    public Integer getVodiNa() {
        return vodiNa;
    }

    public void setVodiNa(Integer vodiNa) {
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}