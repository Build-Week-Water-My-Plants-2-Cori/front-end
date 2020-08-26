import AxiosWithAuth from "./AxiosWithAuth";

export function fetchApi() {
  return AxiosWithAuth()
    .get("https://cking-watermyplants.herokuapp.com/api/plants")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log("Fetch err:", err));
}
