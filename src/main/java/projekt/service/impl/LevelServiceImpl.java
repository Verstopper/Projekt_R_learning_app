package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

    }

    @Override
    public void deleteLevel(Integer levelName) throws Exception {
        Level level = levelRepository.findById(levelName)
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji level s imenom: " + levelName + "."));

        levelRepository.delete(level);
    }


}
