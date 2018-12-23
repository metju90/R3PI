import { fetchGet } from "../util";

import linkHeaderParser from "parse-link-header";

interface ActionTypesProps {
  loading: string;
  data: string;
  error: string;
  pages?: string;
}

const commonAction = async (
  url: string,
  dispatch: any,
  actionTypes: ActionTypesProps
) => {
  dispatch({ type: actionTypes.loading, payload: true });
  try {
    const response = await fetchGet(url);
    if (response.status < 200 || response.status >= 300) {
      dispatch({
        type: actionTypes.error,
        payload: true
      });
      return null;
    }
    const responseData = await response.json();
    let headers: any;
    headers = response.headers;
    const pagination = linkHeaderParser(headers.get("Link")) || null;
    if (actionTypes.pages) {
      dispatch({
        type: actionTypes.pages,
        payload: pagination
      });
    }
    dispatch({
      type: actionTypes.data,
      payload: responseData
    });
  } catch (err) {
    console.error("FETCH_FOLLOWERS_ERROR", err);
    dispatch({
      type: actionTypes.error,
      payload: true
    });
  }
  dispatch({ type: actionTypes.loading, payload: false });
};

export { commonAction };
