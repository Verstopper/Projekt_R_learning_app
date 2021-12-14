package projekt.service.impl;

import projekt.domain.Igra;

import java.util.Optional;

public interface IgraServiceIMpl {

    Optional<Igra> addGame(Igra igra);
}
