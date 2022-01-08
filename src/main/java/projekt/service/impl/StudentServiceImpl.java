package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Game;
import projekt.domain.Grade;
import projekt.domain.Predajeu;
import projekt.domain.Professor;
import projekt.exceptions.InvalidLoginException;
import projekt.repo.*;
import projekt.service.StudentService;

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
        if(!studentRepository.
        existsByUsername(username))
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
}
