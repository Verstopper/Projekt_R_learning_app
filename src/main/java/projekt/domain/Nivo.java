package projekt.domain;

import javax.persistence.*;

@Table(name = "nivo")
@Entity
public class Nivo {
    @Id
    @Column(name = "id_nivo", nullable = false, length = 10)
    private String id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "sljedeci_nivo", length = 10)
    private String sljedeciNivo;

    @Column(name = "prethodni_nivo", length = 10)
    private String prethodniNivo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_igre", nullable = false)
    private Igra idIgre;

    public Igra getIdIgre() {
        return idIgre;
    }

    public void setIdIgre(Igra idIgre) {
        this.idIgre = idIgre;
    }

    public String getPrethodniNivo() {
        return prethodniNivo;
    }

    public void setPrethodniNivo(String prethodniNivo) {
        this.prethodniNivo = prethodniNivo;
    }

    public String getSljedeciNivo() {
        return sljedeciNivo;
    }

    public void setSljedeciNivo(String sljedeciNivo) {
        this.sljedeciNivo = sljedeciNivo;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}