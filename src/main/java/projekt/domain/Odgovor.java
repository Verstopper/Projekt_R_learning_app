package projekt.domain;

import javax.persistence.*;

@Entity
@Table(name = "odgovor")
public class Odgovor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_odgovr", nullable = false)
    private Integer id;

    @Column(name = "\"točnost\"", nullable = false, length = 100)
    private String točnost;

    @Column(name = "vodi_na", nullable = false)
    private Integer vodiNa;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_pitanje", nullable = false)
    private Pitanje idPitanje;

    @Column(name = "text")
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

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