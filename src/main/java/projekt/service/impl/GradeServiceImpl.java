package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Grade;
import projekt.domain.Student;
import projekt.dto.GradeAddDto;
import projekt.dto.StudentAddDto;
import projekt.exceptions.UsernameException;
import projekt.repo.GradeRepository;
import projekt.repo.StudentRepository;
import projekt.service.GradeService;

import java.io.InvalidObjectException;
import java.util.Locale;

@Service
@AllArgsConstructor
public class GradeServiceImpl implements GradeService {
    private GradeRepository gradeRepository;
    private StudentRepository studentRepository;

    @Override
    public Integer addGrade(GradeAddDto gradeAddDto) throws InvalidObjectException {
        if (gradeRepository.existsByNameAndAndGeneration(gradeAddDto.getName().toLowerCase(), gradeAddDto.getGeneration()))
            throw new InvalidObjectException("U generaciji: " + gradeAddDto.getGeneration() + " već postoji razred: " + gradeAddDto.getName() + ".");

        Grade grade = Grade.builder()
                .name(gradeAddDto.getName().toLowerCase())
                .generation(gradeAddDto.getGeneration())
                .build();

        return gradeRepository.save(grade).getId();
    }

    @Override
    public Student addStudent(Integer gradeId, StudentAddDto studentAddDto) throws InvalidObjectException {
        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new InvalidObjectException("Ne postoji razred s id-jem: " + gradeId + "."));

        if(studentRepository.existsByUsername(studentAddDto.getUsername()))
            throw new UsernameException("Neki učenik već ima korisničko ime: " + studentAddDto.getUsername() + ".");

        Student student = Student.builder()
                .username(studentAddDto.getUsername())
                .fullName(studentAddDto.getFullName())
                .grade(grade).build();

        return studentRepository.save(student);
    }
}
