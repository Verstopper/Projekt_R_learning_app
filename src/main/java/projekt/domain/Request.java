package projekt.domain;

public class Request {

    private String naziv;
    private String opis;
    private String oib;


    public Request(String naziv, String opis, String oib) {
        this.naziv = naziv;
        this.opis = opis;
        this.oib = oib;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String opis) {
        this.naziv = naziv;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getOib() {
        return oib;
    }

    public void setOib(String oib) {
        this.oib = oib;
    }
}
