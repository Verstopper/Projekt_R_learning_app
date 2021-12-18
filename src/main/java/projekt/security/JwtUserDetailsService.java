package projekt.security;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import projekt.dto.UserDto;
import projekt.domain.Professor;
import projekt.domain.Student;
import projekt.domain.Role;
import projekt.repo.ProfessorRepository;
import projekt.repo.StudentRepository;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private final ProfessorRepository professorRepository;
    private final StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto userDto = new UserDto();

        if (professorRepository.existsByUsername(username)) {
            Professor professor = professorRepository.findByUsername(username);
            userDto = UserDto.builder()
                    .username(professor.getUsername())
                    .password(professor.getPassword())
                    .role(Role.PROFESSOR)
                    .build();
        }

        if (studentRepository.existsByUsername(username)) {
            Student student = studentRepository.findByUsername(username);
            userDto = UserDto.builder()
                    .username(student.getUsername())
                    .role(Role.STUDENT)
                    .build();
        }

        return new org.springframework.security.core.userdetails.User(userDto.getUsername(), userDto.getPassword(), new ArrayList<>());
    }
}
