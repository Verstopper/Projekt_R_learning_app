package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;
import projekt.domain.Professor;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;
import projekt.exceptions.EmailException;
import projekt.exceptions.InvalidLoginException;
import projekt.exceptions.UsernameException;
import projekt.repo.GradeRepository;
import projekt.repo.ProfessorRepository;
import projekt.service.ProfessorService;

@Service
@AllArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorRepository professorRepository;
    private final ConversionService conversionService;
    private final GradeRepository gradeRepository;

    @Override
    public void register(RegistrationDto registrationDto) {
        if(professorRepository.existsByUsername(registrationDto.getUsername()))
            throw new UsernameException("Korisnicko ime se već koristi.");

        if(professorRepository.existsByEmail(registrationDto.getEmail()))
            throw new EmailException("Vec postoji korisnicki racun s ovim mailom.");

        Professor professor = conversionService.convert(registrationDto, Professor.class);

        professorRepository.save(professor);

        LoginDto loginDto = LoginDto.builder()
                .username(registrationDto.getUsername())
                .password(registrationDto.getPassword())
                .build();

        login(loginDto);
    }

    @Override
    public void login(LoginDto loginDto){
        if(!professorRepository.existsByUsernameAndPassword(loginDto.getUsername(), loginDto.getPassword()))
            throw new InvalidLoginException("Wrong login info");
        ;
    }
}
