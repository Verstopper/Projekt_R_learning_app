package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Ucenik;
import projekt.exceptions.UsernameException;
import projekt.repo.UcenikRepository;
import projekt.service.UcenikService;

@Service
@AllArgsConstructor
public class UcenikServiceImpl implements UcenikService {

    private final UcenikRepository ucenikRepository;

    @Override
    public Ucenik login(String korisnickoIme) {
        return ucenikRepository.findByKorisnickoIme(korisnickoIme)
                .orElseThrow(() -> new UsernameException("Uceniku jos nije dodjeljeno korisnicko ime."));
    }
}
