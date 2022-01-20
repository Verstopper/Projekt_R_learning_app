import axios from "axios";

const API_URl = 'http://localhost:8080'
const api = axios.create({
    baseURL: API_URl
})

class GradeService {
    async addGrade(name, generation, username) {
        let response = {success: false,}
        try {
            await api.post("/api/ZabavnoUcenje/razred",
                {name: name, generation: generation, username: username});
            response.data = true;
            response.success = true;
        } catch (err) {
            response.data = "Greška prilikom dodavanja razreda."
            response.success = false;

        }
        return response.success
    }
}

export default new GradeService()