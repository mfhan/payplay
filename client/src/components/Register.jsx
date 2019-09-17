import React from 'react';

// This component handles our register form
const Register = (props) => {

  return (
    <div>
      <h2>Register</h2>
      <hr />
      <form onSubmit={props.handleRegister} >
        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
