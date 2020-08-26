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
  background-color: #1b4332;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3%;
  font-size: 1.5rem;
  font-family: "Playfair Display", serif;
  color: #fefae0;
  margin: 1% auto;
  height: 55vh;
  border-radius: 20px;
  width: 45%;
  * {
    text-decoration: none;
  }
  h1 {
    font-password: 4rem;
    color: #fefae0;
    letter-spacing: 1.3rem;
    font-family: "Playfair Display", serif;
    h2 {
      color: white;
      font-size: 1.7rem;
    }
    h3 {
      font-size: 1.8rem;
    }
  }
`;
export default function LogInForm(props) {
  const { values, submit, inputChange, disabled, errors } = props;

  const initialLogInFormValues = {
    username: "",
    phonenumber: "",
    password: "",
  };

  const initialLogInFormErrors = {
    username: "",
    phonenumber: "",
    password: "",
  };

  const initialLogUsers = [];
  const initialLogDisabled = true;

  const [logUsers, setLogUsers] = useState(initialLogUsers);
  const [logFormValues, setLogFormValues] = useState(initialLogInFormValues);
  const [logFormErrors, setLogFormErrors] = useState(initialLogInFormErrors);
  const [logDisabled, setLogDisabled] = useState(initialLogDisabled);

  const postNewLogUser = (newLogUser) => {
    axios
      .post("http://localhost:3000/login", newLogUser)
      .then((res) => {
        setLogUsers([res.data, ...logUsers]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLogFormValues(initialLogInFormValues);
      });
  };

  const inputlogChange = (name, value) => {
    yup
      .reach(formschema, name)
      .validate(value)
      .then((valid) => {
        setLogFormErrors({
          ...logFormErrors,
          [name]: " ",
        });
      })
      .catch((err) => {
        setLogFormErrors({
          ...logFormErrors,
          [name]: err.errors[0],
        });
      });
    setLogFormValues({
      ...logFormValues,
      [name]: value,
    });
  };

  const submitLog = () => {
    const newLogUser = {
      username: logFormValues.username.trim(),
      phonenumber: logFormValues.phonenumber.trim(),
      password: logFormValues.password.trim(),
    };
    postNewLogUser(newLogUser);
  };

  useEffect(() => {
    formschema.isValid(logFormValues).then((valid) => {
      setLogDisabled(!valid);
    });
  }, [logFormValues]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    submitLog();
  };

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    inputChange(name, value);
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
          <h3>Pass word</h3>
          <input
            value={values.password}
            onChange={onInputChange}
            name="password"
            type="password"
          />
        </label>
        <button logDisabled={disabled} submit={submit}>
          Submit
        </button>
        <Link to="/signupform">
          <h3>Sign Up</h3>
        </Link>
      </form>
    </LogInFormStyle>
  );
}
