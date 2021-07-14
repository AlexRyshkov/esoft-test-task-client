import { ADD_TODO_MESSAGE, REMOVE_TODO_MESSAGE } from "./types";

export const addTodoMessage = (title, message) => ({
    type: ADD_TODO_MESSAGE,
    payload: { title, message },
});

export const removeTodoMessage = (messageIndex) => ({
    type: REMOVE_TODO_MESSAGE,
    payload: { messageIndex }
});
