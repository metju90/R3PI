import { API_ROOT_URL } from "../constants";

export function fetchGet(url: string) {
  const x = url.includes("?") ? "&" : "?";
  const t = `&access_token=d4b7b3a3ef40d4366ebbe5dbea4b6e4e008b7787`;
  const urlToken = url + x + t;
  console.log(urlToken);
  return fetch(urlToken, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
