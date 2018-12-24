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

const fetchUsersList = (url?: string | null) => async (dispatch: any) => {
  // using the same action for initial request
  // and pagination's first/next page request
  url = url ? url : `${API_ROOT_URL}/users`;

  const actionTypes = {
    loading: FETCH_USERS_LIST,
    pages: FETCH_USERS_LIST_PAGES,
    error: FETCH_USERS_LIST_ERROR,
    data: FETCH_USERS_LIST
  };
  commonAction(url, dispatch, actionTypes);
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
