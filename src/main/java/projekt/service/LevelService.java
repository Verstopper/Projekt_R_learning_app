package projekt.service;

import projekt.domain.Game;
import projekt.domain.Grade;
import projekt.domain.Level;
import projekt.dto.RequestDto;

public interface LevelService {

    Level addLevel(RequestDto grade);

    boolean deleteLevel(Level level) throws Exception;
}
