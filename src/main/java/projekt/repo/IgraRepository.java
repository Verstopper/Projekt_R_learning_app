package projekt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import projekt.domain.Igra;

import javax.transaction.Transactional;

@Repository
public interface IgraRepository extends JpaRepository<Igra, Integer> {



    boolean existsByNaziv(String naziv);
}