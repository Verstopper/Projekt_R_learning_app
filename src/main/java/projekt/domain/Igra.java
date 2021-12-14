package projekt.domain;

import javax.persistence.*;

@Entity
@Table(name = "_igra")
public class Igra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_igre")
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "opis", nullable = false, length = 1000)
    private String opis;


    @ManyToOne(optional = false)
    @JoinColumn(name = "oib", nullable = true)
    private Profesor profesor;

    public Profesor getOib() {
        return profesor;
    }

    public void setOib(Profesor profesor) {

        this.profesor = profesor;
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