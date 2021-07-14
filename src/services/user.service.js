import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/api/user/`;

class UserService {
    getAssignees() {
        return axios.get(API_URL + 'assignees', { headers: authHeader() });
    }
}

export default new UserService();