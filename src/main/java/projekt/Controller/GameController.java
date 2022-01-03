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

import java.util.List;

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
    public ResponseEntity<Boolean> deleteGame(@RequestBody @NonNull Game game) throws Exception {
        return ResponseEntity.ok(gameService.deleteGame(game));
    }

    @PostMapping("/getAll")
    public ResponseEntity<List<Game>> showGame(@RequestBody Request oibProf) throws Exception {
            return ResponseEntity.ok(gameService.getAllGamesForProfessor(oibProf.getOib()));
    }
}
