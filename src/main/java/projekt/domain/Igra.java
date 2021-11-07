package projekt.domain;

import javax.persistence.*;

@Table(name = "_igra")
@Entity
public class Igra {
    @Id
    @Column(name = "id_igre", nullable = false, length = 10)
    private String id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "opis", nullable = false, length = 1000)
    private String opis;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_profesora", nullable = false)
    private Profesor idProfesora;

    public Profesor getIdProfesora() {
        return idProfesora;
    }

    public void setIdProfesora(Profesor idProfesora) {
        this.idProfesora = idProfesora;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}