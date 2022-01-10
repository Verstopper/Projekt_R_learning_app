package projekt.service;

import projekt.domain.Game;
import projekt.dto.GameUpdateDto;
import projekt.dto.RequestDto;

import java.util.List;


public interface GameService {

    Game addGame(RequestDto igra) throws Exception;

    void deleteGame(Integer game) throws Exception;

    List<Game> getAllGamesForProfessor(String oib) throws Exception;

    void updateGame(GameUpdateDto gameUpdateDto);
}
