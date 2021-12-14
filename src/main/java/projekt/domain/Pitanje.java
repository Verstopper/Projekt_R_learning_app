package projekt.domain;

import javax.persistence.*;

@Entity
@Table(name = "pitanje")
public class Pitanje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pitanje", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "text", nullable = false, length = 1000)
    private String text;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_nivo", nullable = false)
    private Nivo idNivo;

    public Nivo getIdNivo() {
        return idNivo;
    }

    public void setIdNivo(Nivo idNivo) {
        this.idNivo = idNivo;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}