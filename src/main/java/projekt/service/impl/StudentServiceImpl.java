package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.exceptions.InvalidLoginException;
import projekt.repo.StudentRepository;
import projekt.service.StudentService;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public void login(String username) {
        if(!studentRepository.existsByUsername(username))
            throw new InvalidLoginException("Upisano je pogrešno korisničko ime.");
    }
}
