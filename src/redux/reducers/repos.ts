import {
  FETCH_REPOS,
  FETCH_REPOS_ERROR,
  FETCH_REPOS_LOADING,
  FETCH_REPOS_PAGES,
  RESET_REPOS
} from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_REPOS_ERROR:
    case FETCH_REPOS:
    case FETCH_REPOS_PAGES:
    case FETCH_REPOS_LOADING:
      return {
        ...state,
        ...action.payload
      };
    case RESET_REPOS:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
