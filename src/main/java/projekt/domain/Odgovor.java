package projekt.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "odgovor")
@Entity
@Data
@Builder
@NoArgsConstructor
public class Odgovor {
    @Id
    @Column(name = "id_odgovr", nullable = false)
    private Integer id;

    @Column(name = "\"točnost\"", nullable = false, length = 100)
    private String točnost;

    @Column(name = "text", nullable = false, length = 1000)
    private String text;

    @Column(name = "vodi_na", nullable = false)
    private Integer vodiNa;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_pitanje", nullable = false)
    private Pitanje idPitanje;

}