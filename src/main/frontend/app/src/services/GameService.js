import axios from "axios";

const API_URl = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const api = axios.create({
    baseURL: API_URl
})

class GameService {
    async addGame(name, description, username) {
        let response = {success: false,}
        let game;
        let success = false;
        try {
            game = await api.post("/igra/dodaj",
                {name: name, description: description, username:username});
            response.data= true;
        }catch (err){
            response.data = "Greška prilikom dodavanja igre."
        }
        return response
    }
}

export default new GameService()