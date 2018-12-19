import {
  FETCH_USERS_LIST,
  FETCH_USERS_LIST_ERROR,
  FETCH_USERS_LIST_LOADING
} from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_USERS_LIST_ERROR: {
      return {
        ...state,
        hasError: action.payload
      };
    }
    case FETCH_USERS_LIST:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_USERS_LIST_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
