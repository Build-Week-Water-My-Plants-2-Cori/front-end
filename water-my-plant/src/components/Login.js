import React, { useState } from "react";
import AxiosWithAuth from "./AxiosWithAuth";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const hahdleSubmit = (e) => {
    e.preventDefault();
    // axios
    AxiosWithAuth()
      .post(
        "https://cking-watermyplants.herokuapp.com/login",
        `grant_type=password&username=${form.username}&password=${form.password}`,
        {
          headers: {
            // btoa is converting our client id/client secret into base64
            Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("token", res.data.access_token);
        props.history.push("/plants");
      });
  };

  return (
    <>
      <h1>Welcome to the Water My Plants App!</h1>
      <form onSubmit={hahdleSubmit}>
        <input
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
