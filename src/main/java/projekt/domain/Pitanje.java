package projekt.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Optional;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pitanje")
public class Pitanje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pitanje", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "text", length = 1000)
    private String text;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_nivo", nullable = false)
    private Nivo idNivo;
}