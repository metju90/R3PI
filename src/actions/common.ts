import { fetchGet } from "../util";
import { FETCH_USERS_LIST } from "../constants";
import linkHeaderParser from "parse-link-header";
import urlTemplate from "url-template";

const commonAction = async (url: string, dispatch: any, actionType: string) => {
  dispatch({ type: actionType, payload: { isLoading: true } });
  try {
    const response = await fetchGet(url);
    if (response.status < 200 || response.status >= 300) {
      dispatch({
        type: actionType,
        payload: {
          hasError: true,
          isLoading: false
        }
      });
      return null;
    }
    const responseData = await response.json();
    let headers: any;
    headers = response.headers;
    const pagination = linkHeaderParser(headers.get("Link")) || null;
    // This is used only for the users list.
    if (pagination && pagination.first && actionType === FETCH_USERS_LIST) {
      pagination.first.url = urlTemplate
        .parse(pagination.first.url)
        .expand({ since: 0 });
    }
    dispatch({
      type: actionType,
      payload: {
        data: responseData,
        pages: pagination,
        isLoading: false,
        hasError: false
      }
    });
  } catch (err) {
    console.error("FETCH_FOLLOWERS_ERROR", err);
    dispatch({
      type: actionType,
      payload: {
        isLoading: false,
        hasError: true
      }
    });
  }
};

export { commonAction };
