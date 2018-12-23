import { fetchGet } from "../util";
import {
  FETCH_FOLLOWERS,
  FETCH_FOLLOWERS_ERROR,
  FETCH_FOLLOWERS_LOADING,
  FETCH_FOLLOWERS_PAGES
} from "../constants";
import { commonAction } from "./common";

const fetchFollowers = (url: string) => async (dispatch: any) => {
  const actionTypes = {
    loading: FETCH_FOLLOWERS_LOADING,
    data: FETCH_FOLLOWERS,
    error: FETCH_FOLLOWERS_ERROR,
    pages: FETCH_FOLLOWERS_PAGES
  };
  commonAction(url, dispatch, actionTypes);
};

export { fetchFollowers };
