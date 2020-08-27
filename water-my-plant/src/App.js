// import React, { useState, useEffect } from "react";
// import SignUpForm from "./SignUpForm";
// import LoginForm from "./LoginForm";
// import styled from "styled-components";
// import { Route } from "react-router-dom";
// import formschema from "./formSchema";
// import * as yup from "yup";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   width: 100%;
//   color: white;
//   background-color: #283618;
//   h1 {
//     margin: 2% auto;
//   }
// `
// const initialFormValues = {
//   username: "",
//   password: "",
//   number: "",
// };
// const initialFormErrors = {
//   username: "",
//   password: "",
//   number: "",
// };
// const initialDisabled = true;

// function App() {
//   const [formValues, setFormValues] = useState(initialFormValues);
//   const [formErrors, setFormErrors] = useState(initialFormErrors);
//   const [disabled, setDisabled] = useState(initialDisabled);

//   const inputChange = (name, value) => {
//     yup
//       .reach(formschema, name)
//       .validate(value)
//       .then((valid) => {
//         setFormErrors({
//           ...formErrors,
//           [name]: " ",
//         });
//       })
//       .catch((err) => {
//         setFormErrors({
//           ...formErrors,
//           [name]: err.errors[0],
//         });
//       });
//     setFormValues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   const submit = () => {
//     const newUser = {
//       username: formValues.username.trim(),
//       password: formValues.password.trim(),
//       number: formValues.number.trim(),
//     };
//   };

//   useEffect(() => {
//     formschema.isValid(formValues).then((valid) => {
//       setDisabled(!valid);
//     });
//   }, [formValues]);

//   return (
//     <AppContainer>
//       <h1>Water my plant </h1>
//       <Route exact path="/">
//         <SignUpForm
//           values={formValues}
//           inputChange={inputChange}
//           submit={submit}
//           disabled={disabled}
//         />
//       </Route>
//       <Route path="/loginform">
//         <LoginForm/>
//       </Route>
//     </AppContainer>
//   )
// }

// export default App;
import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import formschema from "./formSchema";
import axios from "axios";
import * as yup from "yup";
import { Route, Switch } from "react-router-dom";
import LogInForm from "./LoginForm";
import styled from "styled-components";
import Confirmation from "./Comfirmation"
const HeaderStyle = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  font-weight: lighter;
  display: flex;
  justify-content: center;
  h1 {
    font-size: 4.5rem;

    font-weight: bolder;
    font-style: italic;
    letter-spacing: 0.6rem;
  }
`;

const initialFormValues = {
  username: "",
  phonenumber: "",
  password: "",
};
const initialFormErrors = {
  username: "",
  phonenumber: "",
  password: "",
};
const initialUsers = [];
const initialDisabled = true;
const initialData = {};

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [datas, setDatas] = useState(initialData);

  const postNewUser = (newUser) => {
    axios.post("http://localhost:3000/singup", newUser)
      .then((res) => {
        setUsers([res.data.data, ...users]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const inputChange = (name, value) => {
    yup
      .reach(formschema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors, 
          [name]: " ",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const submit = () => {
    const newUser = {
      username: formValues.username.trim(),
      phonenumber: formValues.phonenumber.trim(),
      password: formValues.password.trim(),
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    formschema.isValid(formValues).then((valid) => {
      setDisabled(!valid);

    });
  }, [formValues]);
  

  useEffect(() => {
    axios.get("https://reqres.in/api/users").then((res) => {
      setDatas(res.data.data[0]);
    });
}, []);

  return (
    <div className="container">
      <HeaderStyle>
        <h1>Water my plant</h1>
      </HeaderStyle>
      <Switch>
        <Route path="/loginform">
          <LogInForm
             values={formValues}
             inputChange={inputChange}
             submit={submit}
             disabled={disabled}
             errors={formErrors}
          />
        </Route>
        
        <Route path="/data">
          <Confirmation info={datas}/>
        </Route>

        <Route path="/">
          <SignUpForm
            values={formValues}
            inputChange={inputChange}
            submit={submit}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
      </Switch>
      
  
    </div>
  );
}
