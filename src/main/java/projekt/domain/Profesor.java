package projekt.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "profesor")
@Entity
@Data
@Builder
@NoArgsConstructor
public class Profesor {
    @Id
    @Column(name = "oib", nullable = false, length = 10)
    private String id;

}