package projekt.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "nivo")
@Entity
@Data
@Builder
@NoArgsConstructor
public class Nivo {
    @Id
    @Column(name = "id_nivo", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "sljedeci_nivo")
    private Integer sljedeciNivo;

    @Column(name = "prethodni_nivo")
    private Integer prethodniNivo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_igre", nullable = false)
    private Igra idIgre;
}