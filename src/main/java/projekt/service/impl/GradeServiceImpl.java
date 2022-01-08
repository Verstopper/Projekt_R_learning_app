package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.*;
import projekt.dto.GradeAddDto;
import projekt.dto.StudentAddDto;
import projekt.exceptions.UsernameException;
import projekt.repo.GradeRepository;
import projekt.repo.ProfessorRepository;
import projekt.repo.StudentRepository;
import projekt.repo.TeachesInRepository;
import projekt.service.GradeService;

import java.io.InvalidObjectException;
import java.util.Locale;

@Service
@AllArgsConstructor
public class GradeServiceImpl implements GradeService {
    private GradeRepository gradeRepository;
    private StudentRepository studentRepository;
    private ProfessorRepository professorRepository;
    private TeachesInRepository teachesInRepository;

    @Override
    public boolean addGrade(GradeAddDto gradeAddDto) throws InvalidObjectException {
        try {
            if (gradeRepository.existsByNameAndAndGeneration(gradeAddDto.getName().toLowerCase(), gradeAddDto.getGeneration()))
                throw new InvalidObjectException("U generaciji: " + gradeAddDto.getGeneration() + " već postoji razred: " + gradeAddDto.getName() + ".");

            Grade grade = Grade.builder()
                    .name(gradeAddDto.getName().toLowerCase())
                    .generation(gradeAddDto.getGeneration())
                    .build();

            grade = gradeRepository.save(grade);
            Professor professor = professorRepository.findByUsername(gradeAddDto.getUsername());

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
        }catch (Exception e) {
            return false;
        }

        return true;
    }
}
