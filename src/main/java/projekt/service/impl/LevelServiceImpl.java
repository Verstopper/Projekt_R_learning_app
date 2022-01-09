package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Game;
import projekt.domain.Level;
import projekt.repo.GameRepository;
import projekt.repo.LevelRepository;
import projekt.service.LevelService;

import javax.persistence.EntityNotFoundException;

@Service
@AllArgsConstructor
public class LevelServiceImpl implements LevelService {

    LevelRepository levelRepository;
    GameRepository gameRepository;

    @Override
    public void addLevel(Integer levelName) {
        //naziv,id igre
        Game game = gameRepository.findById(levelName)
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji igra s id-em: " + levelName + "."));

        Level level = Level.builder()
                .name(levelName) // treba promijeniti
                .game(game)
                .build();

        if (!levelRepository.existsByNameAndGame(level.getName(), level.getGame()))
            levelRepository.save(level);

    }

    @Override
    public void deleteLevel(Integer levelName) throws Exception {
        Level level = levelRepository.findByName(levelName)
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji level s imenom: " + levelName + "."));

        levelRepository.delete(level);
    }


}
