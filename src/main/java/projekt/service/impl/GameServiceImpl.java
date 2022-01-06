package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import projekt.domain.Game;
import projekt.domain.Professor;
import projekt.dto.RequestDto;
import projekt.repo.GameRepository;
import projekt.repo.ProfessorRepository;
import projekt.service.GameService;
import projekt.service.LevelService;

import java.util.List;

@Service
@AllArgsConstructor
public class GameServiceImpl implements GameService {

    LevelService levelService;
    GameRepository gameRepository;
    ProfessorRepository professorRepository;

    public Game addGame(RequestDto requestDto) throws Exception {
        if (gameRepository.existsByName(requestDto.getName())) {
            throw new Exception("Igra istog imena već postoji!");
        }

        Game game = new Game();
        game.setName(requestDto.getName());
        game.setDescription(requestDto.getDescription());
        game.setProfessor(professorRepository.findProfessorById(requestDto.getOib()));
        gameRepository.save(game);
        levelService.addLevel(game.getId());
        return game;
    }


    public List<Game> getAllGamesForProfessor(String username) throws Exception {
        Professor professor = professorRepository.findByUsername(username);
        List<Game> games = gameRepository.findAllByProfessor(professor);
        if (games.size() == 0) {
            throw new Exception("Ne posotje igre za ovo");
        }
        return games;
    }

    public boolean deleteGame(Game game) throws Exception {
        if (!gameRepository.existsById((game.getId()))) return false;
        levelService.deleteLevel(game.getId());
        gameRepository.delete(game);

        return true;
    }

}
