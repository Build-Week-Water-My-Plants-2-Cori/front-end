import React from "react";

 const SignUpForm = (props) => {
    const {
      values,
      submit,
      inputChange,
      disabled,
      errors,
  } = props;

  const onSubmit = (evt) => {
    // evt.preventDefault();
    // submit();
  };
  const onInputChange = (evt) => {
    // const { name, value } = evt.target;
    // inputChange(name, value);
  };
  return (
    <div>
      {/* <Link to="/">
        <h1>HOME</h1>
      </Link> */}
      <form className="signup-form" onSubmit={}>
        {/* <div>{errors.username}</div>
        <div>{errors.phonenumber}</div>
        <div>{errors.password}</div> */}
        <h2>SIGN UP</h2>
        <label>
          <h3>User Name</h3>  &nbsp;
          <input
            value={values.username}
            onChange={}
            name="username"
            type="text"
          />
        </label>
        <label>
          <h3>Phone Number</h3>  &nbsp;
          <input
            value={values.phonenumber}
            onChange={}
            name="phonenumber"
            type=" integer"
          />
        </label>
        <label>
          <h3>Password</h3>  &nbsp;
          <input
            value={values.password}
            onChange={}
            name="password"
            type="password"
          />
        </label>
        <button disabled={}>Submit</button>
        </form>
    </div> 
  );
}

export default SignUpForm