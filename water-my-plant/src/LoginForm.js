// import React, { useState } from "react";
// import styled from "styled-components";
// import axios from "axios";

// const FormWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-content: center;
//   font-size: 1.6rem;
//   width: 100%;
//   height: 100%;
// `;

// const BASE_URL = "http://localhost:3000/login";

// const LoginForm = () => {
//   let [state, setState] = useState({
//     username: "",
//     password: "",
//     number: "",
//   });

//   const handleChange = (e) => {
//     e.preventDefault();
//     const { value, name } = e.target;
//     setState({
//       ...state,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${BASE_URL}/login`, state);
//       console.log(res.data);
//       setState({
//         username: "",
//         password: "",
//         number: "",
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <FormWrapper>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name &nbsp;
//           <input
//             type="text"
//             name="name"
//             value={state.name}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Password &nbsp;
//           <input
//             type="password"
//             name="password"
//             value={state.password}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Phone number &nbsp;
//           <input
//             type="text"
//             name="number"
//             value={state.number}
//             onChange={handleChange}
//           />
//         </label>
//         <br></br>
//         <button>Submit</button>
//       </form>
//     </FormWrapper>
//   );
// };

// export default LoginForm;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import * as yup from "yup";
import formschema from "./formSchema";

const LogInFormStyle = styled.div`
  background-color: #2d6a4f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3%;
  font-size: 1.9rem;
  color: #fefae0;
  width: 60%;
  margin: 0.9% auto;
  height: 70vh;
  border-radius: 20px;
  * {
    text-decoration: none;
  }
  h1 {
    font-size: 3rem;
    color: #fefae0;
    font-weight: lighter;
  }
  h2 {
    color: #d8f3dc;
    font-size: 1.7rem;
    font-weight: lighter;
  }
  h3 {
    font-size: 1.8rem;
    font-weight: lighter;
  }
  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    background-color: #1b4332;
    font-size: 1.5rem;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #b7e4c7;
    color: black;
  }
`;


export default function LogInForm(props) {
  const { values, submit, inputChange, disabled, errors } = props;

 const onInputChange = (evt) => {
   const {name, value} = evt.target
   inputChange(name, value)
 }
 
  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  

  return (
    <LogInFormStyle>
      <form className="form" onSubmit={onSubmit}>
        <div>{errors.username}</div>
        <div>{errors.phonenumber}</div>
        <div>{errors.password}</div>
        <h1>LOG IN </h1>
        <label>
          <h3>User Name</h3>
          <input
            value={values.username}
            onChange={onInputChange}
            name="username"
            type="text"
          />
        </label>
        <label>
          <h3>Phone number</h3>
          <input
            value={values.phonenumber}
            onChange={onInputChange}
            name="phonenumber"
            type="text"
          />
        </label>
        <label>
          <h3>Password</h3>
          <input
            value={values.password}
            onChange={onInputChange}
            name="password"
            type="password"
          />
        </label>
        <button disabled={disabled} submit={submit}>
          Submit
        </button>
        <Link to="/signupform">
          <h2>Sign Up</h2>
        </Link>
        <Link to="/data">
          <h2>Data</h2>
        </Link>
      </form>
    </LogInFormStyle>
  );
}
