import { combineReducers } from "redux";
import usersList from "./usersList";
import userDetails from "./userDetails";
import pagination from "./pagination";
import repos from "./repos";

export default combineReducers({
  usersList,
  userDetails,
  pagination,
  repos
});
