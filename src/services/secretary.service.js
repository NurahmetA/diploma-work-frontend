import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'https://diploma-aitu-backend.herokuapp.com/secretary/';

class SecretaryService {
    addQuestion(teamId, question, students, questionerId) {
        return axios.post(API_URL + teamId + "/question/create", { description: question, studentIds: students, questionerId: questionerId }, {
            headers: authHeader()
        })
    }

    getDefences() {
        return axios.get(API_URL + "defence", { headers: authHeader() })
    }

    getDefence(defenceId) {
        return axios.get(API_URL + "defence/" + defenceId, { headers: authHeader() })
    }

    getGrades(defenceId) {
        return axios.get(API_URL + defenceId + "/grades", { headers: authHeader() })
    }

    setGrade(defenceId, userId, grade) {
        return axios.post(API_URL + defenceId + "/grades/set-grade/" + userId, { grade: grade }, { headers : authHeader() })
    }

    getFirstProtocol(userId) {
        return axios.get(API_URL + userId + "/document/protocol-first", { headers: authHeader() })
    }

    getSecondProtocol(userId) {
        return axios.get(API_URL + userId + "/document/protocol-second", { headers: authHeader() })
    }

    getCommissions(defenceId) {
        return axios.get(API_URL + "defence/" + defenceId + "/commissions", { headers: authHeader() })
    }

    updateQuestion(defenceId, questionId, desc) {
        return axios.put(API_URL + defenceId + "/question/update", {id: questionId, description: desc}, {  headers: authHeader() });
    }

    deleteQuestion(defenceId, questionId) {
        return axios.delete(API_URL + defenceId + "/question/" + questionId, {  headers: authHeader() });
    }

}

export default new SecretaryService();
