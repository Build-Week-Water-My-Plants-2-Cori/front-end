import AxiosWithAuth from "./AxiosWithAuth";

export function fetchApi() {
  return AxiosWithAuth()
    .get("https://cking-watermyplants.herokuapp.com/plants/plants")
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => console.log("Fetch err:", err));
}
