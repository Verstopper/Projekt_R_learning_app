import axios from "axios";
const API_URl = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const api = axios.create({
    baseURL : API_URl
})

class ProfessorService{
    async getAllGames(username){
        let games;
        let success = false;
        try{
            console.log(username);
            console.log("ovo mora proc")
            games = await api.post("/igra/getAll",{username});
            console.log(games.data);
            console.log("probavam dohvatit igre...");
            success = true;
        }catch (err) {
            games = "Error!"
        }
        return{
            games : games.data,
            success : success,
        }
    }

    async professorSignUp(oib, username, password, fullName, email){
        let response = {success: false,}
        try{
            let varijabla = await api.post("/api/ZabavnoUcenje/registracija",
            {oib: oib, username : username,password:password,fullName:fullName,email:email});
            response.data = "Registracija uspješna :)"
            response.success = true;
        }catch (e) {
            response.data = "Greška prilikom registracije :("
        }
        return response;
    }

    async getAllGrades(username) {
        let url = "/api/ZabavnoUcenje/profesor/getAllGrades";
        let response = {success: false}
        try {
            let response2 = await api.post(url, {username: username});
            console.log("response2: " + response2.data)
            response.success = true
            response.data = response2.data
            console.log("response: " + response.data)
        } catch (err) {
            response.data = "Greška prilikom dohvata razreda."
        }
        return response
    }
}

export default new ProfessorService()