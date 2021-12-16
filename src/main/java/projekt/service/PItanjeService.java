package projekt.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projekt.domain.Nivo;
import projekt.domain.Pitanje;
import projekt.domain.Request;
import projekt.repo.NivoRepository;
import projekt.repo.PitanjeRepository;


public interface PItanjeService {

    public Pitanje addQuestion(Request pitanje) throws Exception;

    boolean deleteQuestion(Pitanje pitanje) throws Exception;
}
