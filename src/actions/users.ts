import {
  FETCH_USER_DETAILS,
  RESET_USER_DETAILS,
  FETCH_USERS_LIST,
  API_ROOT_URL
} from "../constants";

import { commonAction } from "./common";

const fetchUsersList = (url?: string | null) => async (dispatch: any) => {
  // using the same action for initial request
  // and pagination's first/next page request
  url = url ? url : `${API_ROOT_URL}/users`;

  commonAction(url, dispatch, FETCH_USERS_LIST);
};

const resetUserDetails = () => (dispatch: any) =>
  dispatch({ type: RESET_USER_DETAILS });

const fetchUserDetails = (username: string) => (dispatch: any) => {
  const url = `${API_ROOT_URL}/users/${username}`;
  commonAction(url, dispatch, FETCH_USER_DETAILS);
};

export { fetchUsersList, fetchUserDetails, resetUserDetails };
