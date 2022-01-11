import axios from "axios";

const API_URl = 'http://localhost:8080'
const api = axios.create({
    baseURL: API_URl
})

class GradeService {
    async addGrade(name, generation, username) {
        let response = {success: false,}
        let game;
        let success = false;
        try {
            game = await api.post("/api/ZabavnoUcenje/razred",
                {name: name, generation: generation, username: username});
            response.data = true;
        } catch (err) {
            response.data = "Greška prilikom dodavanja razreda."
        }
        return response
    }
}

export default new GradeService()