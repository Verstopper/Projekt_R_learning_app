import axios from "axios";

const API_URl = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const api = axios.create({
    baseURL: API_URl
})
class QuestionService {
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
}

export  default new QuestionService()