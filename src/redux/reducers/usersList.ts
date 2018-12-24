import { FETCH_USERS_LIST } from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_USERS_LIST:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
