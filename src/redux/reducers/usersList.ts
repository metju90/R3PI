import {
  FETCH_USER,
  FETCH_USER_ERROR,
  FETCH_USER_LOADING
} from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_USER_ERROR: {
      return {
        ...state,
        hasError: action.payload
      };
    }
    case FETCH_USER:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_USER_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
