import axios from "axios";

const API_URl = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const api = axios.create({
    baseURL: API_URl
})
class AnswerService {
    async getAllAnswers(id_question) {
        let response = {success: false,}
        let answers;
        try {
            answers = await api.post("/odgovor/getAllAnswers",
                {idigre:id_question});
            response.data= answers.data;
            response.success = true;
        }catch (err){
            response.success = false;
            response.data = "Greška prilikom pregleda pitanja."
        }
        return response
    }
}

export default new AnswerService()