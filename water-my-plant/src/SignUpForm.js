// import React, { useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import {Link} from "react-router-dom";

// const SignupFormWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-content: center;
//   font-size: 1.6rem;
//   width: 100%;
//   height: 100%;
// `;

// const BASE_URL = "http://localhost:3000/singup";

// const SignUpForm = (props) => {
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
//     <SignupFormWrapper>
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
//         <Link exact path="/loginform"> <button>login</button> </Link>
//       </form>
//     </SignupFormWrapper>
//   );
// };

// export default SignUpForm;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import * as yup from "yup";
import formschema from "./formSchema";

const SignUpFormStyle = styled.div`
  background-color: #2d6a4f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3%;
  font-password: 1.8rem;
  font-family: "Playfair Display", serif;
  color: #fefae0;
  width: 45%;
  margin: 1% auto;
  height: 55vh;
  border-radius: 20px;
  * {
    text-decoration: none;
  }
  h1 {
    font-size: 2.5rem;
    color: #fefae0;
    font-family: "Playfair Display", serif;
    letter-spacing: 0.5rem;
  }
  h2 {
    color: #d8f3dc;
    font-size: 1.7rem;
  }
  h3 {
    font-size: 1.8rem;
  }
`;
const initialSignUpFormValues = {
  username: "",
  phonenumber: "",
  password: "",
};
const initialSignUpFormErrors = {
  username: "",
  phonenumber: "",
  password: "",
};
const initialSignUsers = [];
const initialDisabled = true;

export default function SignUpForm(props) {
  const { values, submit, inputChange, disabled, errors } = props;
  const [signUsers, setSignUsers] = useState(initialSignUsers);
  const [signFormValues, setSignFormValues] = useState(initialSignUpFormValues);
  const [signFormErrors, setSignFormErrors] = useState(initialSignUpFormErrors);
  const [signDisabled, setSignDisabled] = useState(initialDisabled);

  const postNewSignUser = (newSignUser) => {
    axios
      .post("http://localhost:3000/singup", newSignUser)
      .then((res) => {
        setSignUsers([res.data, ...signUsers]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSignFormValues(initialSignUpFormValues);
      });
  };

  const inputSignChange = (name, value) => {
    yup
      .reach(formschema, name)
      .validate(value)
      .then((valid) => {
        setSignFormErrors({
          ...signFormErrors,
          [name]: " ",
        });
      })
      .catch((err) => {
        setSignFormErrors({
          ...signFormErrors,
          [name]: err.errors[0],
        });
      });
    setSignFormValues({
      ...signFormValues,
      [name]: value,
    });
  };

  const submitSign = () => {
    const newSignUser = {
      username: signFormValues.username.trim(),
      phonenumber: signFormValues.phonenumber.trim(),
      password: signFormValues.password.trim(),
    };
    postNewSignUser(newSignUser);
  };

  useEffect(() => {
    formschema.isValid(signFormValues).then((valid) => {
      setSignDisabled(!valid);
    });
  }, [signFormValues]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    submitSign();
  };

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    inputChange(name, value);
  };

  return (
    <SignUpFormStyle>
      <h1>SIGN UP</h1>
      <form className="form" onSubmit={onSubmit}>
        <div>{errors.username}</div>
        <div>{errors.phonenumber}</div>
        <div>{errors.password}</div>
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
          <h3>Phone Number</h3>
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
        <button signDisabled={disabled} submit={submit}>
          Submit
        </button>
        &nbsp;
        <Link to="/loginform">
          <h2>If you already have an account : LOG IN </h2>
        </Link>
      </form>
    </SignUpFormStyle>
  );
}
