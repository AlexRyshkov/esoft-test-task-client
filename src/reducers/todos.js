import { SET_TODO, CLEAR_TODO } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_TODO:
            return [...payload];
        case CLEAR_TODO:
            return [];

        default:
            return state;
    }
}
