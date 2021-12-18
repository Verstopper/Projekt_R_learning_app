package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import projekt.domain.Game;
import projekt.dto.RequestDto;
import projekt.repo.GameRepository;
import projekt.repo.ProfessorRepository;
import projekt.service.GameService;

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

    public boolean deleteGame(Game game) {
        if(!gameRepository.existsById((game.getId()))) return false;

        gameRepository.delete(game);
        return true;
    }

}
