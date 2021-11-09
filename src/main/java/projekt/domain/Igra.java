package projekt.domain;

import javax.persistence.*;

@Table(name = "_igra")
@Entity
public class Igra {
    @Id
    @Column(name = "id_igre", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "opis", nullable = false, length = 1000)
    private String opis;

    @ManyToOne(optional = false)
    @JoinColumn(name = "oib", nullable = false)
    private Profesor oib;

    public Profesor getOib() {
        return oib;
    }

    public void setOib(Profesor oib) {
        this.oib = oib;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
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