import axios from "axios";
const API_URl = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const api = axios.create({
    baseURL : API_URl
})
class StudentService {
    async getAllGames(username) {
        let games;
        let success = false;
        try{
            console.log("USERRNAME " + username )
        games = await api.post("/api/ZabavnoUcenje/ucenik/allGame",{username:username});
            console.log("SVE IGRE " + games.data)
        success = true;
        }catch (error) {
            games = "Error"
        }
        return{
            games : games.data,
            success : success,
        }
    }
}

export default new StudentService()