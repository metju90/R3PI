import {
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_ERROR,
  FETCH_USER_DETAILS_LOADING,
  FETCH_REPOS_PAGES,
  RESET_USER_DETAILS
} from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_USER_DETAILS_ERROR:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_USER_DETAILS:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_USER_DETAILS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case RESET_USER_DETAILS: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
}
