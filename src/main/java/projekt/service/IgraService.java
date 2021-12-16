package projekt.service;

import projekt.domain.Igra;
import projekt.domain.Request;


public interface IgraService {

    Igra addGame(Request igra) throws Exception;

    boolean deleteGame(Igra igra) throws Exception;
}
