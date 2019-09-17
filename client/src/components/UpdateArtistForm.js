import React from 'react';
import { Redirect } from 'react-router-dom';

//props.form.name
//props.composer.name
const UpdateArtistForm = (props) => {
  if (!props.form.id) {
    return <Redirect to="/" />
  }
  return (
    <>
      <h2>Update Your Data</h2>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          name="username"
          value={props.form.username}
          onChange={props.handleChange}
        />
        <label htmlFor="zipcode">zipcode:</label>
        <input
          type="number"
          name="zipcode"
          value={props.form.zipcode}
          onChange={props.handleChange}
        />
        <label htmlFor="website">website:</label>
        <input
          type="text"
          name="website"
          value={props.form.website}
          onChange={props.handleChange}
        />
        <button type="submit">Submit!</button>
      </form>
    </>
  )
}

export default UpdateArtistForm;
