import { fetchGet } from "../util";
import { FETCH_USERS_LIST_PAGES } from "../constants";
import linkHeaderParser from "parse-link-header";
import urlTemplate from "url-template";

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
  dispatch({ type: actionTypes.loading, payload: { isLoading: true } });
  try {
    const response = await fetchGet(url);
    if (response.status < 200 || response.status >= 300) {
      dispatch({
        type: actionTypes.error,
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
    if (actionTypes.pages) {
      // This is used only for the users list.
      if (
        pagination &&
        pagination.first &&
        actionTypes.pages === FETCH_USERS_LIST_PAGES
      ) {
        pagination.first.url = urlTemplate
          .parse(pagination.first.url)
          .expand({ since: 0 });
      }
      dispatch({
        type: actionTypes.pages,
        payload: {
          pages: pagination
        }
      });
    }
    dispatch({
      type: actionTypes.data,
      payload: {
        data: responseData,
        isLoading: false,
        hasError: false
      }
    });
  } catch (err) {
    console.error("FETCH_FOLLOWERS_ERROR", err);
    dispatch({
      type: actionTypes.error,
      payload: {
        isLoading: false,
        hasError: true
      }
    });
  }
};

export { commonAction };
