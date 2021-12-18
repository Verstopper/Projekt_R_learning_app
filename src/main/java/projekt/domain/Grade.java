package projekt.domain;

import lombok.AllArgsConstructor;
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
@AllArgsConstructor
@NoArgsConstructor
public class Grade {
    @Id
    @Column(name = "id_razred", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 100)
    private String name;

    @Column(name = "generacija", nullable = false, length = 100)
    private String generation;
}