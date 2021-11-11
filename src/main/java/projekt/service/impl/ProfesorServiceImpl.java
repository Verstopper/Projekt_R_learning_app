package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Profesor;
import projekt.exceptions.EmailException;
import projekt.exceptions.InvalidLoginException;
import projekt.exceptions.UsernameException;
import projekt.repo.ProfesorRepository;
import projekt.service.ProfesorService;

@Service
@AllArgsConstructor
public class ProfesorServiceImpl implements ProfesorService {

    private final ProfesorRepository profesorRepository;

    @Override
    public Profesor register(Profesor profesor) {
        if(profesorRepository.existsByKorisnicko_ime(profesor.getKorisnicko_ime()))
            throw new UsernameException("Korisnicko ime se već koristi.");

        if(profesorRepository.existsByEmail(profesor.getEmail()))
            throw new EmailException("Vec postoji korisnicki racun s ovim mailom.");

        return profesorRepository.save(profesor);
    }

    @Override
    public Profesor login(String korisnickoIme, String lozinka) {
        return profesorRepository.findByKorisnicko_imeAndLozinka(korisnickoIme, lozinka)
                .orElseThrow(() -> new InvalidLoginException("Unesena je pogresna kombinacija korisnickog imena i lozinke."));
    }
}
