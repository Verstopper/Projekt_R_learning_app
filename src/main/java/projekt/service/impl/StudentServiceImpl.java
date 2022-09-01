package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.*;
import projekt.dto.StudentAddDto;
import projekt.exceptions.InvalidLoginException;
import projekt.exceptions.UsernameException;
import projekt.repo.*;
import projekt.service.StudentService;

import javax.persistence.EntityNotFoundException;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final GradeRepository gradeRepository;
    private final TeachesInRepository teachesInRepository;
    private final ProfessorRepository professorRepository;
    private final GameRepository gameRepository;

    @Override
    public void login(String username) {
        if (!studentRepository.existsByUsername(username))
            throw new InvalidLoginException("Upisano je pogrešno korisničko ime.");
    }

    @Override
    public List<Game> getAllGames(String username) {
        Grade grade = studentRepository.findGrade(username);

        Set<Predajeu> professorSet = teachesInRepository.getAllByGrade(grade);
        List<Game> allGames = new LinkedList<>();
        for (var predjeu : professorSet) {
            Professor professor = professorRepository.findProfessorById(predjeu.getProfessor().getId());
            List<Game> games = gameRepository.findAllByProfessor(professor);
            allGames.addAll(games);
        }
        return allGames;
    }

    @Override
    public void addStudent(StudentAddDto studentAddDto) {
        Grade grade = gradeRepository.findByName(studentAddDto.getGradeName())
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji razred s imenom: " + studentAddDto.getGradeName() + "."));

        if (studentRepository.existsByUsername(studentAddDto.getUsername()))
            throw new UsernameException("Neki učenik već ima korisničko ime: " + studentAddDto.getUsername() + ".");

        Student student = Student.builder()
                .username(studentAddDto.getUsername())
                .fullName(studentAddDto.getFullName())
                .grade(grade).build();

        studentRepository.save(student);
    }

    @Override
    public void deleteStudent(int studentId) {
        if(!studentRepository.existsById(studentId))
            throw new EntityNotFoundException("Ne postoji učenik s id-em: " + studentId +".");

        studentRepository.deleteById(studentId);
    }
}
