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
    case FETCH_FOLLOWERS_ERROR:
    case FETCH_FOLLOWERS:
    case FETCH_FOLLOWERS_PAGES:
    case FETCH_FOLLOWERS_LOADING:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
