package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Nivo;

@Repository
public interface NivoRepository extends JpaRepository<Nivo, Integer> {

    Nivo findByNaziv(String naziv);
}