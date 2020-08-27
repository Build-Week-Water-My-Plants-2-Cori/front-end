import axios from "axios";

export default function AxiosWithAuth() {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: `${token}`,
    },
    baseURL: "https://cking-watermyplants.herokuapp.com/",
  });
}
