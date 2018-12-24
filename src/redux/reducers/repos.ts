import { FETCH_REPOS, RESET_REPOS } from "../../constants";
import commonState from "../commonState";

const initialState = {
  ...commonState
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_REPOS:
      return {
        ...state,
        ...action.payload
      };
    case RESET_REPOS:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
