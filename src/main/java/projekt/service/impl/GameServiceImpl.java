package projekt.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import projekt.domain.Game;
import projekt.domain.Level;
import projekt.domain.Professor;
import projekt.dto.RequestDto;
import projekt.repo.GameRepository;
import projekt.repo.LevelRepository;
import projekt.repo.ProfessorRepository;
import projekt.service.AnswerService;
import projekt.service.GameService;
import projekt.service.LevelService;
import projekt.service.QuestionService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@AllArgsConstructor
public class GameServiceImpl implements GameService {

    LevelService levelService;
    GameRepository gameRepository;
    ProfessorRepository professorRepository;
    QuestionService questionService;
    AnswerService answerService;
    LevelRepository levelRepository;

    public Game addGame(RequestDto requestDto) {
        if (gameRepository.existsByName(requestDto.getName()))
            throw new EntityExistsException("Igra istog imena već postoji!");

        Professor professor = professorRepository.findByUsername(requestDto.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji profesor s korisničkim imenom: " + requestDto.getUsername() + "."));

        Game game = Game.builder()
                .name(requestDto.getName())
                .description(requestDto.getDescription())
                .professor(professor).build();
        game = gameRepository.save(game);
        System.out.println(game.getId());
        Level level = new Level();
        level.setId(game.getId());
        level.setGame(game);
        level = levelRepository.save(level);

        return game;
    }


    public List<Game> getAllGamesForProfessor(String username) throws Exception {
        Professor professor = professorRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Ne postoji profesor s korisničkim imenom: " + username + "."));

        if(!gameRepository.existsByProfessor(professor))
            throw new EntityNotFoundException("Profesor s korisničkim imenom: " + username + " trenutno nema niti jednu igru.");

        return gameRepository.findAllByProfessor(professor);

    }

    public void deleteGame(Integer gameId) throws Exception {
        if (!gameRepository.existsById(gameId))
            throw new EntityNotFoundException("Ne postoji igra s id-em: " + gameId + ".");

        questionService.deleteAllQuestion(gameId);
        levelService.deleteLevel(gameId);
        gameRepository.deleteById(gameId);
    }

}
