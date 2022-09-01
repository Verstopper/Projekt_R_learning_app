package projekt.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import projekt.domain.Professor;
import projekt.dto.UserDto;
import projekt.domain.Role;

@Component
public class ProfessorToUserDtoConvertor implements Converter<Professor, UserDto> {
    @Override
    public UserDto convert(Professor source) {
        return UserDto.builder()
                .username(source.getUsername())
                .password(source.getPassword())
                .role(Role.PROFESSOR)
                .build();
    }
}
