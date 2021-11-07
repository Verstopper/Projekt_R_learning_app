package projekt.domain;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class VezakorisnikpitanjeId implements Serializable {
    private static final long serialVersionUID = -3336914412795274563L;
    @Column(name = "id_ucenik", nullable = false, length = 10)
    private String idUcenik;
    @Column(name = "id_pitanje", nullable = false, length = 10)
    private String idPitanje;

    public String getIdPitanje() {
        return idPitanje;
    }

    public void setIdPitanje(String idPitanje) {
        this.idPitanje = idPitanje;
    }

    public String getIdUcenik() {
        return idUcenik;
    }

    public void setIdUcenik(String idUcenik) {
        this.idUcenik = idUcenik;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUcenik, idPitanje);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        VezakorisnikpitanjeId entity = (VezakorisnikpitanjeId) o;
        return Objects.equals(this.idUcenik, entity.idUcenik) &&
                Objects.equals(this.idPitanje, entity.idPitanje);
    }
}