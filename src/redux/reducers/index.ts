import { combineReducers } from "redux";
import usersList from "./usersList";
import userDetails from "./userDetails";
import repos from "./repos";
import followers from "./followers";

export default combineReducers({
  usersList,
  userDetails,
  repos,
  followers
});
