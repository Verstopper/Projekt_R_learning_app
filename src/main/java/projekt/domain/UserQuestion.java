package projekt.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
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


}