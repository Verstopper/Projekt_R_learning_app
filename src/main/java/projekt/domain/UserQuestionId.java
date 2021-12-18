package projekt.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class UserQuestionId implements Serializable {
    private static final long serialVersionUID = 3157136244904885093L;

    @Column(name = "id_ucenik", nullable = false)
    private Integer studentId;

    @Column(name = "id_pitanje", nullable = false)
    private Integer questionId;


}