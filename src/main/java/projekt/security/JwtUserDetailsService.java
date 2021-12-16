package projekt.security;

import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import projekt.domain.Korisnik;
import projekt.domain.Profesor;
import projekt.domain.Ucenik;
import projekt.domain.Uloga;
import projekt.repo.ProfesorRepository;
import projekt.repo.UcenikRepository;

import java.util.Collections;

@Service
@AllArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private final ProfesorRepository profesorRepository;
    private final UcenikRepository ucenikRepository;

    @Override
    public UserDetails loadUserByUsername(String korisnickoIme) throws UsernameNotFoundException {
        Korisnik korisnik = new Korisnik();

        if (profesorRepository.existsByKorisnickoIme(korisnickoIme)) {
            Profesor profesor = profesorRepository.findByKorisnickoIme(korisnickoIme);
            korisnik = Korisnik.builder()
                    .korisnickoIme(profesor.getKorisnickoIme())
                    .lozinka(profesor.getLozinka())
                    .uloga(Uloga.PROFESOR)
                    .build();
        }

        if (ucenikRepository.existsByKorisnickoIme(korisnickoIme)) {
            Ucenik ucenik = ucenikRepository.findByKorisnickoIme(korisnickoIme);
            korisnik = Korisnik.builder()
                    .korisnickoIme(ucenik.getKorisnickoIme())
                    .uloga(Uloga.UCENIK)
                    .build();
        }

        return new User(korisnik.getKorisnickoIme(), korisnik.getLozinka(),
                Collections.singletonList(new SimpleGrantedAuthority(korisnik.getUloga().name())));
    }
}
