package projekt.domain;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "predajeu")
@Entity
public class Predajeu {
    @EmbeddedId
    private PredajeuId id;

    public PredajeuId getId() {
        return id;
    }

    public void setId(PredajeuId id) {
        this.id = id;
    }
}