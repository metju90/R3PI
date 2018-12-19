import { fetchGet } from "../util";
import {
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_ERROR,
  FETCH_USER_DETAILS_LOADING,
  FETCH_USERS_LIST_LOADING,
  FETCH_USERS_LIST,
  FETCH_USERS_LIST_ERROR,
  PAGINATION_PAGES,
  PAGINATION_PREV_ID,
  API_ROOT_URL
} from "../constants";
import debounce from "lodash/debounce";
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants";
import linkHeaderParser from "parse-link-header";
import urlTemplate from "url-template";

/**
 *
 * A function which returns an incremented user ID
 * from the last user in the array passed as an argument.
 *
 * @param {Array} usersList array of github's api users object.
 *
 * @return {string} User ID
 */
const getNextUserId = (usersList: any[]) =>
  usersList.slice(-1)[0].id.toString();

// Reversed logic of `getNextUserId`
const getPrevUserId = (usersList: any[]) =>
  (usersList.slice()[0].id - 1).toString();

const buildPagination = (headers: any, data: any, prevSince: string) => {
  const pagination = linkHeaderParser(headers.get("Link")) || {};
  console.log("oringial paginaiton ", pagination);
  if (!pagination.next) {
    pagination.next = {
      // last user of the array + 1.
      // Which will be the first user of the next page.
      // If the next user does not exist (i,e, user ID 8)
      // the user with  the closest ID will be first in the next page.
      since: getNextUserId(data),
      rel: "next",
      url: ""
    };
  }
  if (!pagination.prev && prevSince) {
    pagination.prev = {
      since: prevSince,
      rel: "prev",
      url: urlTemplate.parse(pagination.first.url).expand({ since: prevSince })
    };
  }
  if (pagination.first) {
    pagination.first.url = urlTemplate
      .parse(pagination.first.url)
      .expand({ since: "1" });
    // pagination.first.url
  }
  return pagination;
};

const fetchUsersList = (since?: number) => (dispatch: any, getState: any) => {
  let headers = new Headers();
  const { data } = getState().usersList;
  const previousSince = data[0] && data[0].id;
  console.log("hey ther!! ", previousSince);
  dispatch({ type: FETCH_USERS_LIST_LOADING, payload: true });
  fetchGet(`${API_ROOT_URL}/users${since ? `?since=${since}` : ``}`)
    .then((res: any) => {
      headers = res.headers;
      return res.json();
    })
    .then((res: any) => {
      dispatch({
        type: PAGINATION_PAGES,
        payload: buildPagination(headers, res, previousSince)
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
