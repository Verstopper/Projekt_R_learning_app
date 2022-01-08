package projekt.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;


@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PredajeuId implements Serializable {
    @Column(name = "oib", nullable = false, length = 10)
    private String oib;
    @Column(name = "id_razred", nullable = false)
    private Integer idGrade;


}