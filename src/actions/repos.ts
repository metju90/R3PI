import { fetchGet } from "../util";
import {
  FETCH_REPOS,
  FETCH_REPOS_ERROR,
  FETCH_REPOS_LOADING,
  FETCH_REPOS_PAGES
} from "../constants";
import linkHeaderParser from "parse-link-header";

const fetchRepos = (url: string) => (dispatch: any) => {
  let headers: any;
  fetchGet(url)
    .then(res => {
      headers = res.headers;
      return res.json();
    })
    .then(res => {
      const pagination = linkHeaderParser(headers.get("Link")) || {};
      dispatch({
        type: FETCH_REPOS_PAGES,
        payload: pagination
      });
      dispatch({
        type: FETCH_REPOS,
        payload: res
      });

      console.log("the reposs.... ", res);
    });
};

export { fetchRepos };
