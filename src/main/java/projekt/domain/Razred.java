package projekt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "razred")
@Entity
public class Razred {
    @Id
    @Column(name = "id_razred", nullable = false, length = 10)
    private String id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "generacija", nullable = false, length = 100)
    private String generacija;

    public String getGeneracija() {
        return generacija;
    }

    public void setGeneracija(String generacija) {
        this.generacija = generacija;
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