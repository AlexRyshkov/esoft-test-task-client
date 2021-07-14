import { SET_TODO_FILTER, CLEAR_TODO_FILTER } from "./types";

export const setTodoFilter = (todoFilter) => ({
    type: SET_TODO_FILTER,
    payload: todoFilter,
});

export const сlearTodoFilter = () => ({
    type: CLEAR_TODO_FILTER,
});
