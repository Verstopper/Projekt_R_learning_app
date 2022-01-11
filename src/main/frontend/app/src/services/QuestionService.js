import axios from "axios";

const API_URl = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const api = axios.create({
    baseURL: API_URl
})
class QuestionService {
    async addQuestion(id_game,name,text) {
        let response = {success: false,}
        let question;
        try {
            question = await api.post("/request/dodaj",
                {game:id_game,name:name,text:text});
            response.data= question.data;
            console.log("IU SERVISU DATA " + question.data)
            response.success = true;
        }catch (err){
            response.success = false;
            response.data = "Greška prilikom dodaje pitanja."
        }
        return response
    }

    async getAllQuestions(id_game) {
        let response = {success: false,}
        let questions;
        try {
            questions = await api.post("/request/getAll",
                {idigre:id_game});
            response.data= questions.data;
            console.log("IU SERVISU DATA " + questions.data)
            response.success = true;
        }catch (err){
            response.success = false;
            response.data = "Greška prilikom pregleda igara."
        }
        return response
    }

    async deleteAllQuestions(id_question) {
        let response = {success: false,}
        let questions;
        console.log("UDE U FUNKCIJU I PITANJE " + id_question)
        try {
            questions = await api.post("/request/izbrisi",
                {idpitanje:id_question});
            response.data= questions.data;
            response.success = true;
        }catch (err){
            response.success = false;
            response.data = "Greška prilikom pregleda igara."
        }
        return response
    }

    async updateQuestion(id_question, updatedName, updatedText) {
        let response = {success: false,}
        let question;
        try {
            question = await api.post("/request/uredi",
                {id:id_question,name:updatedName,text:updatedText});
            response.data= question.data;
            console.log("IU SERVISU DATA " + question.data)
            response.success = true;
        }catch (err){
            response.success = false;
            response.data = "Greška prilikom azuriranja pitanja."
        }
        return response
    }
}

export  default new QuestionService()