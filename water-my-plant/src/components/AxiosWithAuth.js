import axios from "axios";

export default function AxiosWithAuth() {
  const token = window.localStorage.getItem("token");
  return axios.create({
    baseURL: "https://cking-watermyplants.herokuapp.com/",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
}
