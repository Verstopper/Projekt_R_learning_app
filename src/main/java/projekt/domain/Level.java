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
@Table(name = "nivo")
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nivo", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private Integer name;

    @Column(name = "sljedeci_nivo")
    private Integer nextLevel;

    @Column(name = "prethodni_nivo")
    private Integer previousLevel;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_igre", nullable = false)
    private Game game;
}