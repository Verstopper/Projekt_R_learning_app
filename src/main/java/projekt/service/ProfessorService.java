package projekt.service;

import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;

public interface ProfessorService {
    void register(RegistrationDto registrationDto);
    void login(LoginDto loginDto);
}
