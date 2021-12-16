package projekt.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "odgovor")
public class Odgovor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_odgovr", nullable = false)
    private Integer id;

    @Column(name = "\"točnost\"", nullable = false, length = 100)
    private String točnost;

    @Column(name = "vodi_na", nullable = false)
    private Integer vodiNa;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_pitanje", nullable = false)
    private Pitanje idPitanje;

    @Column(name = "text")
    private String text;
}