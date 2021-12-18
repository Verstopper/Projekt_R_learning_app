package projekt.service;

import projekt.domain.Game;
import projekt.dto.RequestDto;


public interface GameService {

    Game addGame(RequestDto igra) throws Exception;

    boolean deleteGame(Game game) throws Exception;
}
