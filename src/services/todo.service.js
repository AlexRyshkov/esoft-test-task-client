import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/api/todo/`;

class TodoService {
    getTodos(todoFilter) {
        const queryParams = new URLSearchParams([["completeDate", todoFilter.groupByCompleteDate], ["assignee", todoFilter.groupByAssignee]]);
        return axios.get(API_URL, { params: queryParams, headers: authHeader() });
    }

    getTodo(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    updateTodo(id, data) {
        return axios.put(API_URL + id, data, { headers: authHeader() });
    }

    addTodo(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }
}

export default new TodoService();