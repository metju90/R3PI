import {
  FETCH_FOLLOWERS,
  FETCH_FOLLOWERS_ERROR,
  FETCH_FOLLOWERS_LOADING,
  FETCH_FOLLOWERS_PAGES
} from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_FOLLOWERS_ERROR: {
      return {
        ...state,
        ...action.payload
      };
    }
    case FETCH_FOLLOWERS:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_FOLLOWERS_PAGES:
      return {
        ...state,
        pages: action.payload
      };
    case FETCH_FOLLOWERS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
