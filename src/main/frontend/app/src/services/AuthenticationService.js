import axios from "axios";
const API_URL = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
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
        if (user === null) return ''
        return user
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    }

    registerProfesor(oib, korisnicko_ime, lozinka, ime_i_prezime, email) {
        let url = "/api/ZabavnoUcenje/registracija";
        return api.post(url,{
            oib: oib, korisnicko_ime : korisnicko_ime,lozinka:lozinka,ime_i_prezime:ime_i_prezime,email:email
        })
    }

    loginAdmin(korisnicko_ime,lozinka) {
        let url = "/api/ZabavnoUcenje/login";
        return api.post(url, {korisnicko_ime: korisnicko_ime, lozinka: lozinka})
    }

    loginUcenik(korisnicko_ime) {
        let url = "/api/ZabavnoUcenje/Ucenik/login";
        return api.post(url,{korisnicko_ime:korisnicko_ime})
    }

}
export default new
AuthenticationService()