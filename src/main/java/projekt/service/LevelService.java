package projekt.service;

import projekt.domain.Game;
import projekt.domain.Grade;
import projekt.domain.Level;
import projekt.dto.RequestDto;

public interface LevelService {

    Level addLevel(Integer level1);

    boolean deleteLevel(Integer level) throws Exception;
}
