package projekt.service;

import projekt.domain.Game;

import java.util.List;

public interface StudentService {
    void login(String username);
    List<Game> getAllGames(String username);
}
