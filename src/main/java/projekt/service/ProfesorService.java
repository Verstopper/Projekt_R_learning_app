package projekt.service;

import projekt.domain.Profesor;

public interface ProfesorService {
    Profesor register(Profesor profesor);
    Profesor login(String korisnickoIme, String lozinka);
}
