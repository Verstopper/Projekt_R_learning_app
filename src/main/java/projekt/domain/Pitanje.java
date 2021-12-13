package projekt.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "pitanje")
@Entity

public class Pitanje {
    @Id
    @Column(name = "id_pitanje", nullable = false)
    private Integer id;

}