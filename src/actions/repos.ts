import { fetchGet } from "../util";
import {
  FETCH_REPOS,
  FETCH_REPOS_ERROR,
  FETCH_REPOS_LOADING,
  FETCH_REPOS_PAGES
} from "../constants";
import { commonAction } from "./common";

const fetchRepos = (url: string) => async (dispatch: any) => {
  const actionTypes = {
    loading: FETCH_REPOS_LOADING,
    data: FETCH_REPOS,
    error: FETCH_REPOS_ERROR,
    pages: FETCH_REPOS_PAGES
  };
  commonAction(url, dispatch, actionTypes);
};
export { fetchRepos };
