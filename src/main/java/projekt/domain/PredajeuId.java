package projekt.domain;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PredajeuId implements Serializable {
    private static final long serialVersionUID = -6837646994085258610L;
    @Column(name = "id_profesora", nullable = false, length = 10)
    private String idProfesora;
    @Column(name = "id_razred", nullable = false, length = 10)
    private String idRazred;

    public String getIdRazred() {
        return idRazred;
    }

    public void setIdRazred(String idRazred) {
        this.idRazred = idRazred;
    }

    public String getIdProfesora() {
        return idProfesora;
    }

    public void setIdProfesora(String idProfesora) {
        this.idProfesora = idProfesora;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProfesora, idRazred);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PredajeuId entity = (PredajeuId) o;
        return Objects.equals(this.idProfesora, entity.idProfesora) &&
                Objects.equals(this.idRazred, entity.idRazred);
    }
}