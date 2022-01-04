import axios from "axios";
const API_URl = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const api = axios.create({
    baseURL : API_URl
})

class ProfessorService{
    async getAllGames(){
        let games;
        let success = false;
        try{
            console.log("ovo mora proc")
            games = await api.get("igra/getAll");
            console.log("probavam dohvatit igre...");
            games = games.data;
            success = true;
        }catch (err) {
            games = "Error!"
        }
        return{
            games : games,
            success : success,
        }
    }

    async professorSignUp(oib, korisnicko_ime, lozinka, ime_i_prezime, email){
        let response = {success: false,}
        try{
            let varijabla = await api.post("/api/ZabavnoUcenje/registracija",
            {oib: oib, korisnicko_ime : korisnicko_ime,lozinka:lozinka,ime_i_prezime:ime_i_prezime,email:email});
            response.data = "Registracija uspješna :)"
            response.success = true;
        }catch (e) {
            response.data = "Greška prilikom registracije :("
        }
        return response;
    }
}

export default new ProfessorService()