package projekt.service;

import projekt.domain.Professor;
import projekt.domain.Student;
import projekt.dto.AuthenticationResponseDto;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;
import projekt.dto.StudentAddDto;

import java.io.InvalidObjectException;

public interface ProfessorService {
    AuthenticationResponseDto register(RegistrationDto registrationDto);
    AuthenticationResponseDto login(LoginDto loginDto);
}
