package projekt.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "korisnik_pitanje")
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserQuestion {
    @EmbeddedId
    private UserQuestionId id;

    @Column(name = "\"početak_pitanje\"", nullable = false)
    private LocalDate startTime;

    @Column(name = "kraj_pitanja", nullable = false)
    private LocalDate endTime;

    @ManyToOne
    @MapsId("questionId")
    @JoinColumn(name = "id_pitanje")
    private Question question_id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "id_ucenik")
    private Student student_id;

}