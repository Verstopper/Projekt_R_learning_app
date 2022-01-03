package projekt.service;

import projekt.domain.Game;
import projekt.dto.RequestDto;

import java.util.List;


public interface GameService {

    Game addGame(RequestDto igra) throws Exception;

    boolean deleteGame(Game game) throws Exception;

    List<Game> getAllGamesForProfessor(String oib) throws Exception;
}
