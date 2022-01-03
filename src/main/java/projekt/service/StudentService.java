package projekt.service;

import projekt.dto.AuthenticationResponseDto;

public interface StudentService {
    AuthenticationResponseDto login(String korisnickoIme);
}
