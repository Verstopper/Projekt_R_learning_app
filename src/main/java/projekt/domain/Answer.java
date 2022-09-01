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
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_odgovr", nullable = false)
    private Integer id;

    @Column(name = "točnost", nullable = false, length = 100)
    private String correctness;

    @Column(name = "vodi_na")
    private Integer leadsTo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_pitanje", nullable = false)
    private Question question;

    @Column(name = "text")
    private String text;
}