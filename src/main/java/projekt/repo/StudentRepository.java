package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import projekt.domain.Grade;
import projekt.domain.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Boolean existsByUsername(String username);


    @Transactional
    @Query("SELECT grade FROM Student WHERE username =:korisnicko_ime")
    Grade findGrade(@Param("korisnicko_ime") String korisnicko_ime);
}