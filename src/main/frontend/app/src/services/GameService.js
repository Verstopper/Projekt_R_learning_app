import axios from "axios";
import LogoutComponent from "../component/LogOutComponent";

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
                {name: name, description: description, username: username});
            response.data = game;
            response.success = true;
        } catch (err) {
            response.data = "Greška prilikom dodavanja igre."
            response.success = false;
        }
        console.log("U SERVISU SUCCES JE " + response.success)
        return response.success
    }

    async deleteGame(game_id) {
        let response = {success: false,}
        let game;
        try {
            game = await api.post("/igra/brisi",
                {idigre: game_id});
            response.data = game.data;
            response.success = true;
        } catch (err) {
            response.data = "Greška prilikom dodavanja igre."
        }
        return response
    }

    async updateGame(id, name, description) {
        let response = {success: false,}
        let game;
        let success = false;
        try {
            game = await api.post("/igra/uredi",
                {id: id, name: name, description: description});
            response.data = true;
        } catch (err) {
            response.data = "Greška prilikom ažuriranja igre."
        }
        return response
    }
}

export default new GameService()