package projekt.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import projekt.domain.Korisnik;
import projekt.domain.Profesor;
import projekt.domain.Uloga;

@Component
public class ProfesorToKorisnikConvertor implements Converter<Profesor, Korisnik> {
    @Override
    public Korisnik convert(Profesor source) {
        return Korisnik.builder()
                .korisnickoIme(source.getKorisnickoIme())
                .lozinka(source.getLozinka())
                .uloga(Uloga.PROFESOR)
                .build();
    }
}
