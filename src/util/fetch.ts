import { API_ROOT_URL } from "../constants";

const commonHeaders = {
  "Content-Type": "text/plain"
};

export function fetchGet(endPoint: string) {
  const _include_headers = function(
    body: any,
    response: any,
    resolveWithFullResponse: any
  ) {
    return { headers: response.headers, data: body };
  };
  const url = API_ROOT_URL + endPoint;
  // return fetch("//predict.local/api/tournaments", {

  return fetch(url, {
    method: "GET",
    headers: {
      ...commonHeaders
    }
  });
}

export function fetchPost(endPoint: string, data: any) {
  const url = API_ROOT_URL + endPoint;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      ...commonHeaders
    }
  });
}
