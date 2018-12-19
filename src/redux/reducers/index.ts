import { combineReducers } from "redux";
import usersList from "./usersList";
import pagination from "./pagination";

export default combineReducers({
  usersList,
  pagination
});
