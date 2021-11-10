package projekt.domain;

import lombok.*;
import javax.persistence.*;

@Table(name = "_igra")
@Entity
@Data
@Builder
@NoArgsConstructor
public class Igra {
    @Id
    @Column(name = "id_igre", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "opis", nullable = false, length = 1000)
    private String opis;

}