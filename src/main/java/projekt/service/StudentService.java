package projekt.service;

import projekt.domain.Game;
import projekt.domain.Student;
import projekt.dto.StudentAddDto;

import java.util.List;

public interface StudentService {
    void login(String username);
    List<Game> getAllGames(String username);
    void addStudent(StudentAddDto studentAddDto);
}
