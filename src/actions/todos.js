import {
    SET_EDITED_TODO, SET_TODO, SET_TODO_MESSAGE
} from "./types";

import TodoService from "../services/todo.service";


export const fetchTodos = (todoFilter) => (dispatch) => {
    TodoService.getTodos(todoFilter).then(res => {
        dispatch({
            type: SET_TODO,
            payload: res.data,
        });
        return Promise.resolve();
    });
};

export const fetchTodo = (id) => (dispatch) => {
    TodoService.getTodo(id).then(res => {
        dispatch({
            type: SET_EDITED_TODO,
            payload: res.data
        });
        return Promise.resolve();
    });
};

export const addTodo = (todo) => (dispatch) => {
    TodoService.addTodo(todo).then(res => {
        dispatch({ type: SET_TODO_MESSAGE, payload: { title: "Создание задачи", message: "Задача успешно создана" } });
        return Promise.resolve();
    },
        error => {
            dispatch({ type: SET_TODO_MESSAGE, payload: { title: "Создание задачи", message: "Возникла ошибка при создании задачи" } });
            return Promise.reject();
        });
}

export const updateTodo = (id, todo) => (dispatch) => {
    TodoService.updateTodo(id, todo).then(res => {
        dispatch({ type: SET_TODO_MESSAGE, payload: { title: "Обновление задачи", message: "Задача успешно обновлена" } });
        return Promise.resolve();
    },
        error => {
            dispatch({ type: SET_TODO_MESSAGE, payload: { title: "Обновление задачи", message: "Возникла ошибка при обновлении задачи" } });
            return Promise.reject();
        });
}