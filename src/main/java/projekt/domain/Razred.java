package projekt.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "razred")
@Entity
@Data
@Builder
@NoArgsConstructor
public class Razred {
    @Id
    @Column(name = "id_razred", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;

    @Column(name = "generacija", nullable = false, length = 100)
    private String generacija;

}