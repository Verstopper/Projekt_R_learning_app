package projekt.domain;

public class Request {

    private String naziv;
    private String opis;
    private String oib;
    private String text;
    private String nivo;

    public Request(String naziv, String opis, String oib,String text,String nivo) {
        this.naziv = naziv;
        this.opis = opis;
        this.oib = oib;
        this.text = text;
        this.nivo = nivo;
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getNivo() {
        return nivo;
    }

    public void setNivo(String nivo) {
        this.nivo = nivo;
    }
}
