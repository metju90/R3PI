import { fetchGet } from "../util";
import {
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_ERROR,
  FETCH_USER_DETAILS_LOADING,
  FETCH_USERS_LIST_LOADING,
  FETCH_USERS_LIST,
  FETCH_USERS_LIST_PAGES,
  FETCH_USERS_LIST_ERROR,
  PAGINATION_PAGES,
  PAGINATION_PREV_ID,
  API_ROOT_URL
} from "../constants";
import debounce from "lodash/debounce";
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants";
import linkHeaderParser from "parse-link-header";
import urlTemplate from "url-template";

const fetchUsersList = (url?: string | null) => (dispatch: any) => {
  console.log("ok!!!");
  let headers: any;
  dispatch({ type: FETCH_USERS_LIST_LOADING, payload: true });
  fetchGet(`${url ? url : `${API_ROOT_URL}/users`}`)
    .then((res: any) => {
      headers = res.headers;
      console.log("wtf?? ", res);
      return res.json();
    })
    .then((res: any) => {
      const pagination = linkHeaderParser(headers.get("Link")) || {};
      if (pagination.first) {
        const { url } = pagination.first;
        pagination.first.url = urlTemplate.parse(url).expand({ since: 0 });
      }
      dispatch({
        type: FETCH_USERS_LIST_PAGES,
        payload: pagination
      });

      dispatch({
        type: FETCH_USERS_LIST,
        payload: res
      });
    })
    .catch((err: any) => {
      console.error("fetching failed", err);
      dispatch({
        type: FETCH_USERS_LIST_ERROR,
        payload: true
      });
    })
    .finally(dispatch({ type: FETCH_USERS_LIST_LOADING, payload: false }));
};

const fetchNextUsersPage = () => (dispatch: any, getState: any) => {};

const fetchUserDetails = (username: string) => (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: FETCH_USER_DETAILS_LOADING, payload: true });
  fetchGet(`${API_ROOT_URL}/users/${username}`)
    .then(res => res.json())
    .then(res => dispatch({ type: FETCH_USER_DETAILS, payload: res }))
    .catch(err => {
      console.error("fetching failed", err);
      dispatch({
        type: FETCH_USER_DETAILS_LOADING,
        payload: true
      });
    })
    .finally(dispatch({ type: FETCH_USER_DETAILS_LOADING, payload: false }));
};

export { fetchUsersList, fetchUserDetails };
