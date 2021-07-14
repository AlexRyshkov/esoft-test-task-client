import { SET_EDITED_TODO, CLEAR_EDITED_TODO } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_EDITED_TODO:
            return { ...state, ...payload };
        case CLEAR_EDITED_TODO:
            return initialState;
        default:
            return state;
    }
}
