package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Grade;
import projekt.domain.Predajeu;
import projekt.domain.Professor;

import java.util.List;
import java.util.Set;

@Repository
public interface TeachesInRepository extends JpaRepository<Predajeu,String> {
    Set<Predajeu> getAllByGrade(Grade grade);
    Set<Predajeu> getAllByProfessor(Professor professor);
    Predajeu getByGradeAndProfessor(Grade grade, Professor professor);
}
