package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Student;
import projekt.repo.StudentRepository;
import projekt.service.StudentService;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public Student login(String korisnickoIme) {
        return null;
    }
}
