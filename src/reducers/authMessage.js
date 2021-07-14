import { SET_AUTH_MESSAGE, CLEAR_AUTH_MESSAGE } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH_MESSAGE:
      return { message: payload };

    case CLEAR_AUTH_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}
