import { combineReducers } from "redux";
import auth from "./auth";
import authMessage from "./authMessage";
import todos from "./todos";
import todoFilter from "./todoFilter";
import editedTodo from "./editedTodo";
import todoMessage from "./todoMessage";

export default combineReducers({
  auth,
  authMessage,
  todos,
  todoFilter,
  editedTodo,
  todoMessage
});
