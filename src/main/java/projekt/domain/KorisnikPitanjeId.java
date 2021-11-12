package projekt.domain;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class KorisnikPitanjeId implements Serializable {
    private static final long serialVersionUID = 3157136244904885093L;
    @Column(name = "id_ucenik", nullable = false)
    private Integer idUcenik;
    @Column(name = "id_pitanje", nullable = false)
    private Integer idPitanje;

    public Integer getIdPitanje() {
        return idPitanje;
    }

    public void setIdPitanje(Integer idPitanje) {
        this.idPitanje = idPitanje;
    }

    public Integer getIdUcenik() {
        return idUcenik;
    }

    public void setIdUcenik(Integer idUcenik) {
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
        KorisnikPitanjeId entity = (KorisnikPitanjeId) o;
        return Objects.equals(this.idUcenik, entity.idUcenik) &&
                Objects.equals(this.idPitanje, entity.idPitanje);
    }
}