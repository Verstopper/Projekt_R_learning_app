import axios from "axios";
import AuthenticationService from "./AuthenticationService";
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

    async addStudent(fullName, username, gradeName) {
        let usernameLoggedIn = AuthenticationService.getLoggedInUserName();
        let url = '/api/ZabavnoUcenje/dodajUcenika'
        console.log("USERNAME LOGGEDIN" + usernameLoggedIn)
        let response = {success: false,}
        // let student;
        let success = false;
        try {
            let student = await api.post(url,
                {fullName: fullName, username: username, gradeName: gradeName});
            response.data= true;
        }catch (err){
            response.data = "Greška prilikom dodavanja studenta."
        }
        return response
    }
}

export default new StudentService()