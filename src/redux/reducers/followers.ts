import { FETCH_FOLLOWERS } from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_FOLLOWERS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
