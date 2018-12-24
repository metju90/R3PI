import { FETCH_FOLLOWERS } from "../constants";
import { commonAction } from "./common";

const fetchFollowers = (url: string) => async (dispatch: any) => {
  commonAction(url, dispatch, FETCH_FOLLOWERS);
};

export { fetchFollowers };
