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

            Integer garde_id = gradeRepository.save(grade).getId();
            Professor prof_id = professorRepository.findByUsername(gradeAddDto.getUsername());

            Predajeu predajeu = new Predajeu();
            PredajeuId predajeuId = new PredajeuId();

            predajeuId.setIdGrade(garde_id);
            predajeuId.setOib(prof_id.getId());
            predajeu.setId(predajeuId);
            predajeu.setGrade(grade);
            predajeu.setProfessor(prof_id);

            teachesInRepository.save(predajeu);
        }catch (Exception e) {
            return false;
        }

        return true;
    }

    @Override
    public Student addStudent(StudentAddDto studentAddDto) throws Exception {
        Grade grade = gradeRepository.getGradeByName(studentAddDto.getGrade());
        if(grade == null) {
            throw  new Exception("Ne postoji razred s tim imenom!");
        }
        if(studentRepository.existsByUsername(studentAddDto.getUsername()))
            throw new UsernameException("Neki učenik već ima korisničko ime: " + studentAddDto.getUsername() + ".");

        Student student = Student.builder()
                .username(studentAddDto.getUsername())
                .fullName(studentAddDto.getFullName())
                .grade(grade).build();

        return studentRepository.save(student);
    }
}
