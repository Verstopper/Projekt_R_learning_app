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

import java.util.List;

@Service
@AllArgsConstructor
public class GameServiceImpl implements GameService {

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

        return gameRepository.save(game);
    }


    public List<Game> getAllGamesForProfessor(String oib) throws Exception{
        Professor professor = professorRepository.findProfessorById(oib);
        List<Game> games = gameRepository.findAllByProfessor(professor);
        if(games.size() == 0) {
            throw new Exception("Ne posotje igre za ovo");
        }
        return games;
    }

    public boolean deleteGame(Game game) {
        if(!gameRepository.existsById((game.getId()))) return false;

        gameRepository.delete(game);
        return true;
    }

}
