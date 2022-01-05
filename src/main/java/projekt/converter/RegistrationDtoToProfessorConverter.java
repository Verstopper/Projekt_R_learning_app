package projekt.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import projekt.domain.Professor;
import projekt.dto.RegistrationDto;

@Component
public class RegistrationDtoToProfessorConverter implements Converter<RegistrationDto, Professor> {
    @Override
    public Professor convert(RegistrationDto source) {
        return Professor.builder()
                .id(source.getOib())
                .fullName(source.getFullName())
                .username(source.getUsername())
                .email(source.getEmail())
                .password(source.getPassword())
                .build();
    }
}
