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
    public Level addLevel(RequestDto requestDto) {
        //naziv,id igre
        Level level = new Level();
        level.setName(requestDto.getName());
        Game game = gameRepository.getById(requestDto.getGame());
        Assert.notNull(game,"NE postoji igra");
        level.setGame(game);
        if(!levelRepository.existsByNameAndGame(level.getName(),level.getGame())) {
        levelRepository.save(level);
        return level;}
        return null;


    }

    @Override
    public boolean deleteLevel(Level level) throws Exception {
        if(!levelRepository.existsByNameAndGame(level.getName(),level.getGame())) {
            return false;
        } else {
            levelRepository.delete(level);
            return true;
        }

    }



}
