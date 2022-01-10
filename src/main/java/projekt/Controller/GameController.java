package projekt.Controller;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import projekt.domain.Game;
import projekt.domain.Request;
import projekt.dto.RequestDto;
import projekt.service.GameService;
import projekt.service.LevelService;

import java.util.List;

@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
@AllArgsConstructor
@RequestMapping("/igra")
public class GameController {

    private GameService gameService;


    @PostMapping("/dodaj")
    public ResponseEntity<Game> addGame(@RequestBody @NonNull RequestDto requestDto) throws Exception {
        return ResponseEntity.ok(gameService.addGame(requestDto));
    }

    @PostMapping("/brisi")
    public ResponseEntity<String> deleteGame(@RequestBody @NonNull Request gameId) throws Exception {
        gameService.deleteGame(gameId.getIdigre());
        return ResponseEntity.ok("Igra uspješno izbrisana.");
    }

    @PostMapping("/getAll")
    public ResponseEntity<List<Game>> showGame(@RequestBody Request username) throws Exception {
            return ResponseEntity.ok(gameService.getAllGamesForProfessor(username.getUsername()));
    }
}
