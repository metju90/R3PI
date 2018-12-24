import { FETCH_REPOS, RESET_REPOS } from "../constants";
import { commonAction } from "./common";

const fetchRepos = (url: string) => async (dispatch: any) => {
  commonAction(url, dispatch, FETCH_REPOS);
};

const resetRepos = () => (dispatch: any) => dispatch({ type: RESET_REPOS });

export { fetchRepos, resetRepos };
