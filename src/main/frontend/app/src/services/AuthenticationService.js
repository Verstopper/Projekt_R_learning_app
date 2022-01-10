import axios from "axios";
const API_URL = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const NAME_SESSION_ATTRIBUTE_NAME = 'User'
export const GAME_SESSION_ATTRIBUTE_NAME = 'gameid'
export const QUESTION_SESSION_ATTRIBUTE_NAME = 'questionid'
export const GAME_NAME_SESSION_ATTRIBUTE_NAME = 'gameName'
export const GAME_DESCRIPTION_SESSION_ATTRIBUTE_NAME = 'gameDesc'
const api = axios.create({
    baseURL: API_URL
})

class AuthenticationService {
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        console.log("Userrrrrrrrrr"  + user)
        if (user === null) return ''
        return user
    }

    getQuestionIntoStorage(id) {
        console.log("STAVLJAM U STORAGE" + id)
        sessionStorage.setItem(QUESTION_SESSION_ATTRIBUTE_NAME,id);
    }

    getQuestionFromStorage() {
        let id_question = sessionStorage.getItem(QUESTION_SESSION_ATTRIBUTE_NAME)
        return id_question
    }


    getGameIntoStorage(id, name, description) {
        sessionStorage.setItem(GAME_SESSION_ATTRIBUTE_NAME,id);
        sessionStorage.setItem(GAME_NAME_SESSION_ATTRIBUTE_NAME, name);
        sessionStorage.setItem(GAME_DESCRIPTION_SESSION_ATTRIBUTE_NAME, description);
    }

    getGameFromStorage() {
        let id_game = sessionStorage.getItem(GAME_SESSION_ATTRIBUTE_NAME)
        return id_game
    }

    getRole() {
        let user = sessionStorage.getItem(NAME_SESSION_ATTRIBUTE_NAME)
        if(user == "student") {
            return user
        }
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)

    }

    putStudentinSession() {
        sessionStorage.setItem(NAME_SESSION_ATTRIBUTE_NAME,"student")
    }



    /*registerProfesor(oib, korisnicko_ime, lozinka, ime_i_prezime, email) {
        let url = "/api/ZabavnoUcenje/registracija";
        return api.post(url,{
            oib: oib, korisnicko_ime : korisnicko_ime,lozinka:lozinka,ime_i_prezime:ime_i_prezime,email:email
        })
    }*/

    loginProfessor(korisnicko_ime, lozinka) {
        let url = "/api/ZabavnoUcenje/profesor/login";
        let mess = api.post(url, {username: korisnicko_ime, password: lozinka})
        console.log(mess)
        return mess
        //return api.post(url, {username: korisnicko_ime, password: lozinka})
    }

    loginUcenik(username) {
        let url = "/api/ZabavnoUcenje/ucenik/login";
        return api.post(url,{username:username})
    }


}
export default new
AuthenticationService()