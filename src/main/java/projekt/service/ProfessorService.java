package projekt.service;

import projekt.domain.Professor;
import projekt.dto.AuthenticationResponseDto;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;

public interface ProfessorService {
    Professor register(RegistrationDto registrationDto);
    AuthenticationResponseDto login(LoginDto loginDto);
}
