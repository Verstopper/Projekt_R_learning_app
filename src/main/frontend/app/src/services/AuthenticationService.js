import axios from "axios";

const API_URL = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const NAME_SESSION_ATTRIBUTE_NAME = 'User'
export const GAME_SESSION_ATTRIBUTE_NAME = 'gameid'
export const QUESTION_SESSION_ATTRIBUTE_NAME = 'questionid'
export const GAME_NAME_SESSION_ATTRIBUTE_NAME = 'gameName'
export const GAME_DESCRIPTION_SESSION_ATTRIBUTE_NAME = 'gameDesc'
export const QUESTION_NAME_SESSION_ATTRIBUTE_NAME = 'questionName'
export const QUESTION_TEXT_SESSION_ATTRIBUTE_NAME = 'questionText'
export const ANSWER_TEXT_SESSION_ATTRIBUTE_NAME = 'answerText'
export const ANSWER_CORRECTNESS_SESSION_ATTRIBUTE_NAME = 'answerCorr'
export const ANSWER_SESSION_ATTRIBUTE_NAME = 'answerId'
export const NUMBER_OF_ANSWERS_SESSION_ATTRIBUTE_NAME = 'numbercount'
export const TRUE_NUMBER_SESSION_ATTRIBUTE_NAME = 'correctanswer'
const api = axios.create({
    baseURL: API_URL
})

class AuthenticationService {
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return user !== null;

    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)

        if (user === null) return ''
        return user
    }

    getQuestionIntoStorage(id, questionName, questionText) {

        sessionStorage.setItem(QUESTION_SESSION_ATTRIBUTE_NAME, id);
        sessionStorage.setItem(QUESTION_NAME_SESSION_ATTRIBUTE_NAME, questionName);
        sessionStorage.setItem(QUESTION_TEXT_SESSION_ATTRIBUTE_NAME, questionText);
    }

    getQuestionFromStorage() {
        return sessionStorage.getItem(QUESTION_SESSION_ATTRIBUTE_NAME)

    }


    getGameIntoStorage(id, name, description) {
        sessionStorage.setItem(GAME_SESSION_ATTRIBUTE_NAME, id);
        sessionStorage.setItem(GAME_NAME_SESSION_ATTRIBUTE_NAME, name);
        sessionStorage.setItem(GAME_DESCRIPTION_SESSION_ATTRIBUTE_NAME, description);
    }

    getAnswerIntoStorage(id, text, correctness) {
        sessionStorage.setItem(ANSWER_SESSION_ATTRIBUTE_NAME, id);
        sessionStorage.setItem(ANSWER_TEXT_SESSION_ATTRIBUTE_NAME, text);
        sessionStorage.setItem(ANSWER_CORRECTNESS_SESSION_ATTRIBUTE_NAME, correctness);
    }

    getAnswerFromStorage() {
        return sessionStorage.getItem(ANSWER_SESSION_ATTRIBUTE_NAME);
    }

    getNumberOfQuestionsIntoStorage(id) {
        sessionStorage.setItem(NUMBER_OF_ANSWERS_SESSION_ATTRIBUTE_NAME, id);

    }
    addCorrectAnswersIntoStorage() {
        let number = sessionStorage.getItem(TRUE_NUMBER_SESSION_ATTRIBUTE_NAME);

        let n = (parseInt(number))
        n++;
        sessionStorage.setItem(TRUE_NUMBER_SESSION_ATTRIBUTE_NAME, n);

    }

    getNumberOfCorrectAnswersfromStorage() {
        return sessionStorage.getItem(TRUE_NUMBER_SESSION_ATTRIBUTE_NAME);

    }

    inicializeNumberOfAnswers() {
        sessionStorage.setItem(TRUE_NUMBER_SESSION_ATTRIBUTE_NAME, "0");
        sessionStorage.getItem(TRUE_NUMBER_SESSION_ATTRIBUTE_NAME);

    }
    getNumberOfQuestionsFromStorage() {
        return sessionStorage.getItem(NUMBER_OF_ANSWERS_SESSION_ATTRIBUTE_NAME);

    }

    getGameFromStorage() {
        return sessionStorage.getItem(GAME_SESSION_ATTRIBUTE_NAME)
    }

    getGameNameFormStorage() {
        return sessionStorage.getItem(GAME_NAME_SESSION_ATTRIBUTE_NAME);

    }
    getDescriptionFromStorage() {
        return sessionStorage.getItem(GAME_DESCRIPTION_SESSION_ATTRIBUTE_NAME);
    }

    getRole() {
        let user = sessionStorage.getItem(NAME_SESSION_ATTRIBUTE_NAME)
        return user == "student";

    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)

    }

    putStudentinSession() {
        sessionStorage.setItem(NAME_SESSION_ATTRIBUTE_NAME, "student")
    }

    putProfessorInSession() {
        sessionStorage.setItem(NAME_SESSION_ATTRIBUTE_NAME, "professor")
    }

    loginProfessor(korisnicko_ime, lozinka) {
        let url = "/api/ZabavnoUcenje/profesor/login";
        return api.post(url, {username: korisnicko_ime, password: lozinka})
    }

    loginUcenik(username) {
        let url = "/api/ZabavnoUcenje/ucenik/login";
        return api.post(url, {username: username})
    }

    clearCorrectAnswers() {
        sessionStorage.removeItem(TRUE_NUMBER_SESSION_ATTRIBUTE_NAME);
    }
}

export default new
AuthenticationService()