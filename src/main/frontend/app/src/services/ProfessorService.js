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
            games = await api.get("igra/getAll");
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
}

export default new ProfessorService()