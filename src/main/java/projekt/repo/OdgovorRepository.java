package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Odgovor;
import projekt.domain.Pitanje;

@Repository
public interface OdgovorRepository extends JpaRepository<Odgovor, Integer> {

    boolean existsByTextAndAndTočnostAndAndIdPitanje(String text,String točnost, Pitanje id_pitanje);

}