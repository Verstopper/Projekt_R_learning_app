package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import projekt.domain.Professor;
import projekt.dto.AuthenticationResponseDto;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;
import projekt.exceptions.EmailException;
import projekt.exceptions.UsernameException;
import projekt.repo.ProfessorRepository;
import projekt.security.JwtTokenBuilder;
import projekt.security.JwtUserDetailsService;
import projekt.service.ProfessorService;

@Service
@AllArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorRepository professorRepository;
    private final ConversionService conversionService;
    private final JwtUserDetailsService jwtUserDetailsService;

    @Override
    public AuthenticationResponseDto register(RegistrationDto registrationDto) {
        if(professorRepository.existsByUsername(registrationDto.getKorisnickoIme()))
            throw new UsernameException("Korisnicko ime se već koristi.");

        if(professorRepository.existsByEmail(registrationDto.getEmail()))
            throw new EmailException("Vec postoji korisnicki racun s ovim mailom.");

        Professor professor = conversionService.convert(registrationDto, Professor.class);

        professorRepository.save(professor);

        LoginDto loginDto = LoginDto.builder()
                .username(registrationDto.getKorisnickoIme())
                .password(registrationDto.getLozinka())
                .build();
        return login(loginDto);
    }

    @Override
    public AuthenticationResponseDto login(LoginDto loginDto){
        try{
            jwtUserDetailsService.loadUserByUsername(loginDto.getUsername());
        }catch (Exception e){
            throw new BadCredentialsException("Wrong username or password", e);
        }

        if(!professorRepository.findByUsername(loginDto.getUsername()).getPassword().equals(loginDto.getPassword()))
            throw new BadCredentialsException("Invalid password");

        UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(loginDto.getUsername());
        return new AuthenticationResponseDto(JwtTokenBuilder.generateToken(userDetails));
    }
}
