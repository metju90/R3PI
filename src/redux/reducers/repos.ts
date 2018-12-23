import {
  FETCH_REPOS,
  FETCH_REPOS_ERROR,
  FETCH_REPOS_LOADING,
  FETCH_REPOS_PAGES
} from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_REPOS_ERROR: {
      return {
        ...state,
        ...action.payload
      };
    }
    case FETCH_REPOS:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_REPOS_PAGES:
      return {
        ...state,
        pages: action.payload
      };
    case FETCH_REPOS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
