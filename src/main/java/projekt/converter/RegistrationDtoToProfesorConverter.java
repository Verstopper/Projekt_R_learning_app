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
                .imeIPrezime(source.getImeIPrezime())
                .email(source.getEmail())
                .lozinka(source.getLozinka())
                .build();
    }
}
