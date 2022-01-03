package projekt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import projekt.domain.Game;
import projekt.domain.Grade;
import projekt.domain.Level;
import projekt.dto.RequestDto;
import projekt.repo.GameRepository;
import projekt.repo.LevelRepository;
import projekt.service.LevelService;

@Service
public class LevelServiceImpl implements LevelService {


    @Autowired
    LevelRepository levelRepository;
    @Autowired
    GameRepository gameRepository;

    @Override
    public Level addLevel(Integer level1) {
        //naziv,id igre
        Level level = new Level();
        level.setName(level1); // treba promjenit
        Game game = gameRepository.getById(level1);
        Assert.notNull(game,"NE postoji igra");
        level.setGame(game);
        if(!levelRepository.existsByNameAndGame(level.getName(),level.getGame())) {
        levelRepository.save(level);
        return level;}
        return null;


    }

    @Override
    public boolean deleteLevel(Integer level) throws Exception {
        Level l1 = levelRepository.findByName(level);

        levelRepository.delete(l1);
        return true;
    }







}
