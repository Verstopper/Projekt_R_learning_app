package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import projekt.domain.Korisnik;
import projekt.domain.Profesor;
import projekt.dto.LoginDto;
import projekt.dto.RegistrationDto;
import projekt.exceptions.EmailException;
import projekt.exceptions.InvalidLoginException;
import projekt.exceptions.UsernameException;
import projekt.repo.ProfesorRepository;
import projekt.security.JwtTokenBuilder;
import projekt.service.ProfesorService;

@Service
@AllArgsConstructor
public class ProfesorServiceImpl implements ProfesorService {

    private final AuthenticationManager authenticationManager;
    private final ProfesorRepository profesorRepository;
    private final ConversionService conversionService;

    @Override
    public Profesor register(RegistrationDto registrationDto) {
        if(profesorRepository.existsByKorisnickoIme(registrationDto.getKorisnickoIme()))
            throw new UsernameException("Korisnicko ime se već koristi.");

        if(profesorRepository.existsByEmail(registrationDto.getEmail()))
            throw new EmailException("Vec postoji korisnicki racun s ovim mailom.");

        Profesor profesor = conversionService.convert(registrationDto, Profesor.class);

        return profesorRepository.save(profesor);
    }

    @Override
    public String login(LoginDto loginDto) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        }catch (AuthenticationException e){
            throw new BadCredentialsException("Wrong username or password", e);
        }

        Profesor profesor = profesorRepository.findByKorisnickoIme(loginDto.getUsername());

        return JwtTokenBuilder.generateToken(conversionService.convert(profesor, Korisnik.class));
    }
}
