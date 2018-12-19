import {
  PAGINATION_LOADING,
  PAGINATION_PAGES,
  PAGINATION_PREV_ID
} from "../../constants";
import commonState from "../commonState";

const initialState = {
  next: null,
  first: null,
  previous: null,
  isLoading: false
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case PAGINATION_PAGES: {
      return {
        ...state,
        ...action.payload
      };
    }
    case PAGINATION_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
