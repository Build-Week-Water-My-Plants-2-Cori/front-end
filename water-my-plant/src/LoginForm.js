import React, { useState } from "react";

 const LoginForm = () => {
     const [login, setLogin] = useState({
         username: "",
         password:"",
     })


  const onLogin = (evt) => {

  };
  const onInputChange = (evt) => {

  };

  return (
    <div>
      <form className="signup-form" onLogin={}>
        <div>{errors.username}</div>
        <div>{errors.password}</div>
        <h2>LOG IN</h2>
        <label>
          <h3>User Name</h3>  &nbsp;
          <input
            value={values.username}
            onChange={onInputChange}
            name="username"
            type="text"
          />
        </label>
  
        <label>
          <h3>Password</h3>  &nbsp;
          <input
            value={values.password}
            onChange={onInputChange}
            name="password"
            type="password"
          />
        </label>
        <button> Log In </button>
        </form>
    </div> 
  );
}

export default SignUpForm