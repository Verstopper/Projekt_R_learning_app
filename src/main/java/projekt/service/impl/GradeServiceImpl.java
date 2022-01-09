package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.*;
import projekt.dto.GradeAddDto;
import projekt.repo.GradeRepository;
import projekt.repo.ProfessorRepository;
import projekt.repo.StudentRepository;
import projekt.repo.TeachesInRepository;
import projekt.service.GradeService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.io.InvalidObjectException;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class GradeServiceImpl implements GradeService {
    private GradeRepository gradeRepository;
    private StudentRepository studentRepository;
    private ProfessorRepository professorRepository;
    private TeachesInRepository teachesInRepository;

    @Override
    public void addGrade(GradeAddDto gradeAddDto) throws InvalidObjectException {
        if (gradeRepository.existsByNameAndAndGeneration(gradeAddDto.getName().toLowerCase(), gradeAddDto.getGeneration()))
            throw new InvalidObjectException("U generaciji: " + gradeAddDto.getGeneration() + " već postoji razred: " + gradeAddDto.getName() + ".");

        Grade grade = Grade.builder()
                .name(gradeAddDto.getName().toLowerCase())
                .generation(gradeAddDto.getGeneration())
                .build();

        grade = gradeRepository.save(grade);
        Professor professor = professorRepository.getByUsername(gradeAddDto.getUsername());

        PredajeuId predajeuId = PredajeuId.builder()
                .idGrade(grade.getId())
                .oib(professor.getId())
                .build();

        Predajeu predajeu = Predajeu.builder()
                .id(predajeuId)
                .grade(grade)
                .professor(professor)
                .build();

        teachesInRepository.save(predajeu);
    }

    @Override
    public void updateGrade(GradeAddDto gradeAddDto, int gradeId) {
        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji razred s id-em: " + gradeId + "."));

        if(gradeAddDto.getName() != null)
            grade.setName(gradeAddDto.getName());

        gradeRepository.save(grade);
    }

    @Override
    public void deleteGrade(int gradeId) {
        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji razred s id-em: " + gradeId + "."));

        List<Student> students = studentRepository.findAllByGrade(grade);
        Set<Predajeu> teachesInList = teachesInRepository.getAllByGrade(grade);

        studentRepository.deleteAll(students);
        teachesInRepository.deleteAll(teachesInList);

        if(studentRepository.existsByGrade(grade))
            throw new EntityExistsException("Ne može se izbrisati razred jer još postoji učenika u tom razredu.");

        gradeRepository.delete(grade);
    }
}
