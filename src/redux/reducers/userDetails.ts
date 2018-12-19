import {
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_ERROR,
  FETCH_USER_DETAILS_LOADING,
  FETCH_REPOS_PAGES
} from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_USER_DETAILS_ERROR: {
      return {
        ...state,
        hasError: action.payload
      };
    }
    case FETCH_USER_DETAILS:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_USER_DETAILS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
