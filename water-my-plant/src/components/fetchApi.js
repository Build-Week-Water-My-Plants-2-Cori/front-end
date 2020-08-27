import AxiosWithAuth from "./AxiosWithAuth";

export function fetchApi() {
  return AxiosWithAuth()
    .get("https://cking-watermyplants.herokuapp.com/plants")
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log("Fetch err:", err));
}
