import { API_ROOT_URL } from "../constants";

export function fetchGet(url: string) {
  let urlToken = url;
  if (!url.includes("access_token")) {
    const ampersandOrQuestion = url.includes("?") ? "&" : "?";
    const access_token = `access_token=d4b7b3a3ef40d4366ebbe5dbea4b6e4e008b7787`;
    urlToken = url + ampersandOrQuestion + access_token;
  }
  return fetch(urlToken, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
