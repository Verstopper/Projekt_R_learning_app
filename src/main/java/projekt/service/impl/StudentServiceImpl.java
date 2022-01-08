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
        if(!studentRepository.existsByUsername(username))
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
            for(var game : games) {
                allGames.add(game);
            }
        }
    return allGames;
    }

    @Override
    public void addStudent(StudentAddDto studentAddDto) {
        Grade grade = gradeRepository.findById(studentAddDto.getGradeId())
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji razred s id-em: " + studentAddDto.getGradeId() +"."));

        if(studentRepository.existsByUsername(studentAddDto.getUsername()))
            throw new UsernameException("Neki učenik već ima korisničko ime: " + studentAddDto.getUsername() + ".");

        Student student = Student.builder()
                .username(studentAddDto.getUsername())
                .fullName(studentAddDto.getFullName())
                .grade(grade).build();

         studentRepository.save(student);
    }
}
