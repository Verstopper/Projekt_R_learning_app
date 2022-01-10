package projekt.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.criteria.CriteriaBuilder;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Request {

    String username;
    Integer idigre;
    Integer idpitanje;
    String korisnicko_ime;
    Integer id_question;



}
