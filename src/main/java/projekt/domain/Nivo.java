package projekt.domain;

import javax.persistence.*;

@Table(name = "nivo")
@Entity
public class Nivo {
    @Id
    @Column(name = "id_nivo", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "sljedeci_nivo")
    private Integer sljedeciNivo;

    @Column(name = "prethodni_nivo")
    private Integer prethodniNivo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_igre", nullable = false)
    private Igra idIgre;

    public Igra getIdIgre() {
        return idIgre;
    }

    public void setIdIgre(Igra idIgre) {
        this.idIgre = idIgre;
    }

    public Integer getPrethodniNivo() {
        return prethodniNivo;
    }

    public void setPrethodniNivo(Integer prethodniNivo) {
        this.prethodniNivo = prethodniNivo;
    }

    public Integer getSljedeciNivo() {
        return sljedeciNivo;
    }

    public void setSljedeciNivo(Integer sljedeciNivo) {
        this.sljedeciNivo = sljedeciNivo;
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