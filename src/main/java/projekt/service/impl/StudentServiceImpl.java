package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import projekt.dto.AuthenticationResponseDto;
import projekt.repo.StudentRepository;
import projekt.security.JwtTokenBuilder;
import projekt.service.StudentService;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public AuthenticationResponseDto login(String username) {
        if(!studentRepository.existsByUsername(username))
            throw new BadCredentialsException("Upisano je pogrešno korisničko ime.");

        return new AuthenticationResponseDto(JwtTokenBuilder.generateToken(username));
    }
}
