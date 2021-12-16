package projekt.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import projekt.domain.Profesor;
import projekt.dto.RegistrationDto;

@Component
public class RegistrationDtoToProfesorConverter implements Converter<RegistrationDto, Profesor> {
    @Override
    public Profesor convert(RegistrationDto source) {
        return Profesor.builder()
                .id(source.getId())
                .imeIPrezime(source.getImeIPrezime())
                .korisnickoIme(source.getKorisnickoIme())
                .email(source.getEmail())
                .lozinka(source.getLozinka())
                .build();
    }
}
