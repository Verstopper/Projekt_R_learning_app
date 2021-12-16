package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projekt.domain.Nivo;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Optional;

@Repository
public interface NivoRepository extends JpaRepository<Nivo, Integer> {

    boolean existsById(Integer id);


    Nivo findByNaziv(String nivo);
}