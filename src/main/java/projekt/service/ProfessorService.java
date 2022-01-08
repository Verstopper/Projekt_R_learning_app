package projekt.service;

import projekt.domain.Grade;
import projekt.domain.Request;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;

import java.util.List;

public interface ProfessorService {
    void register(RegistrationDto registrationDto);
    void login(LoginDto loginDto);
    List<Grade> getAllGrade(Request request);
}
