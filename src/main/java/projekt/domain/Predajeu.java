package projekt.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "predajeu")
public class Predajeu {
    @EmbeddedId
    private PredajeuId id;

    @ManyToOne
    @MapsId("oib")
    @JoinColumn(name = "oib")
    private Professor professor;

    @ManyToOne
    @MapsId("idGrade")
    @JoinColumn(name = "id_razred")
    private Grade grade;


}