package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Pitanje;

@Repository
public interface PitanjeRepository extends JpaRepository<Pitanje, Integer> {


    boolean existsByNazivAndAndText(String naziv,String text);


}
