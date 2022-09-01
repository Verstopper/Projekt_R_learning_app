package projekt.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class UserQuestionId implements Serializable {

    @Column(name = "id_ucenik", nullable = false)
    private Integer studentId;

    @Column(name = "id_pitanje", nullable = false)
    private Integer questionId;


}