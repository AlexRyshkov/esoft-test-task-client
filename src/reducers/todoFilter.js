import { SET_TODO_FILTER, CLEAR_TODO_FILTER } from "../actions/types";

const initialState = {
    groupByCompleteDate: "all",
    groupByAssignee: "all"
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_TODO_FILTER:
            return { ...state, ...payload };
        case CLEAR_TODO_FILTER:
            return initialState;
        default:
            return state;
    }
}
