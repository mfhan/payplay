import React from 'react';
import '../App.css';
// This component handles our register form
const Register = (props) => {
  console.log('this is props.history from register js', props)
  return (
    <div>
      <h2>Register</h2>
      <hr />
      <form onSubmit={props.handleRegister} >

        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <button className="content-button" >Done</button>
      </form>
    </div>
  );
}

export default Register;
