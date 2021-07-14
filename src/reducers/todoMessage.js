import { SET_TODO_MESSAGE, CLEAR_TODO_MESSAGE } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_TODO_MESSAGE:
            return { title: payload.title, message: payload.message };

        case CLEAR_TODO_MESSAGE:
            return initialState;

        default:
            return state;
    }
}
