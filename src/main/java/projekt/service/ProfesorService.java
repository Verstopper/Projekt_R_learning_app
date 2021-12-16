package projekt.service;

import projekt.domain.Profesor;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;

public interface ProfesorService {
    Profesor register(RegistrationDto registrationDto);
    String login(LoginDto loginDto);
}
