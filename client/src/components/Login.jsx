import React from 'react';
import { Link } from 'react-router-dom';

// This component handles our login form and has a link to the register form
const Login = (props) => {
  console.log('this is props.history from login js', props)
  return (
    <div>
      <h2>Log In</h2>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();}} >
        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <button>Login</button>
        <Link to="/register"> or Register </Link>
      </form>
    </div>
  );
}

export default Login;
