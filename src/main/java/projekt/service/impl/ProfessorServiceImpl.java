package projekt.service.impl;

import lombok.AllArgsConstructor;
import net.bytebuddy.dynamic.scaffold.MethodGraph;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;
import projekt.domain.Grade;
import projekt.domain.Predajeu;
import projekt.domain.Professor;
import projekt.domain.Request;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;
import projekt.exceptions.EmailException;
import projekt.exceptions.InvalidLoginException;
import projekt.exceptions.UsernameException;
import projekt.repo.GradeRepository;
import projekt.repo.ProfessorRepository;
import projekt.repo.TeachesInRepository;
import projekt.service.ProfessorService;

import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorRepository professorRepository;
    private final ConversionService conversionService;
    private final GradeRepository gradeRepository;
    private final TeachesInRepository teachesInRepository;

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

    @Override
    public List<Grade> getAllGrade(Request request) {
        Professor professor = professorRepository.findByUsername(request.getUsername());
        Set<Predajeu> listGrade = teachesInRepository.getAllByProfessor(professor);
        List<Grade> lista = new LinkedList<>();
        for(var predaje : listGrade) {
            lista.add(predaje.getGrade());
        }
        return  lista;
    }


}
