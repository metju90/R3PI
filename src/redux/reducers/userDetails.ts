import { FETCH_USER_DETAILS, RESET_USER_DETAILS } from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return {
        ...state,
        ...action.payload
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
