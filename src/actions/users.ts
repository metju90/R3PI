import { fetchGet } from "../util";
import {
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_ERROR,
  FETCH_USER_DETAILS_LOADING,
  FETCH_USERS_LIST_LOADING,
  RESET_USER_DETAILS,
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
import { commonAction } from "./common";

const getFirstUserId = (usersList: any) => usersList[0] && usersList[0].id;

const fetchUsersList = (url?: string | null) => async (dispatch: any) => {
  dispatch({ type: FETCH_USERS_LIST_LOADING, payload: true });
  try {
    const response = await fetchGet(`${url ? url : `${API_ROOT_URL}/users`}`);
    if (response.status < 200 || response.status >= 300) {
      dispatch({
        type: FETCH_USERS_LIST_ERROR,
        payload: true
      });
      return null;
    }
    let headers: any;
    headers = response.headers;
    const pagination = linkHeaderParser(headers.get("Link")) || {};
    const responseData = await response.json();
    if (pagination.first) {
      pagination.first.url = urlTemplate
        .parse(pagination.first.url)
        .expand({ since: 0 });
    }
    dispatch({
      type: FETCH_USERS_LIST_PAGES,
      payload: pagination
    });
    dispatch({
      type: FETCH_USERS_LIST,
      payload: responseData
    });
  } catch (err) {
    console.error("FETCH_USERS_LIST_ERROR", err);
    dispatch({
      type: FETCH_USERS_LIST_ERROR,
      payload: true
    });
  }
  dispatch({ type: FETCH_USERS_LIST_LOADING, payload: false });
};

const resetUserDetails = () => (dispatch: any) =>
  dispatch({ type: RESET_USER_DETAILS });

const fetchUserDetails = (username: string) => (dispatch: any) => {
  const url = `${API_ROOT_URL}/users/${username}`;
  const actionTypes = {
    loading: FETCH_USER_DETAILS_LOADING,
    data: FETCH_USER_DETAILS,
    error: FETCH_USER_DETAILS_ERROR
  };
  commonAction(url, dispatch, actionTypes);
};

export { fetchUsersList, fetchUserDetails, resetUserDetails };
