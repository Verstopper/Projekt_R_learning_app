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
                {idigre: id_question});
            response.data = answers.data;
            response.success = true;
        } catch (err) {
            response.success = false;
            response.data = "Greška prilikom pregleda pitanja."
        }
        return response
    }

    async addAnswer(id_question,name,correctness,name2,correctness2,name3,correctness3,name4,correctness4) {
        let response = {success: false,}
        let answer;
        let cor = "DA";
        let cor2 = "DA";
        let cor3 = "DA";
        let cor4 = "DA";
        try {
            if(correctness == true) {
                cor = "NE"
            }
            if(correctness2 == true) {
                cor2 = "NE"
            }
            if(correctness3 == true) {
                cor3 = "NE"
            }
            if(correctness4 == true) {
                cor4 = "NE"
            }
            answer = await api.post("/odgovor/dodaj",
                {question:id_question,text:name,correctness:cor,text2:name2,correctness2:cor2,text3:name3,correctness3:cor3,text4:name4,correctness4:cor4});
            response.data= answer.data;
            response.success = true;
        }catch (err){
            response.success = false;
            response.data = "Greška prilikom dodavanja odgovora."
        }
        return response
    }

    async deleteAnswers(id_answer) {
        let response = {success: false,}
        let answers;
        try {
            answers = await api.post("/odgovor/izbrisi",
                {id_question:id_answer});
            response.data= answers.data;
            response.success = true;
        }catch (err){
            response.success = false;
            response.data = "Greška prilikom pregleda pitanja."
        }
        return response
    }

    async updateAnswer(answer_id, updatedText, updatedCorrectness) {
        let response = {success: false,}
        let answer;
        try {
            answer = await api.post("/odgovor/uredi",
                {id: answer_id, text: updatedText, correctness: updatedCorrectness});
            response.data = answer.data;
            response.success = true;
        } catch (err) {
            response.success = false;
            response.data = "Greška prilikom ažuriranja odgovora."
        }
        return response
    }
}

export default new AnswerService()