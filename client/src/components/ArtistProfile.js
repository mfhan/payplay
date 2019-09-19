import React, {Component}  from 'react';
const ArtistProfile = (props) => {
  const mapForm = () => {
    return Object.keys(props.form).map((key) => {
      switch(key) {
        case 'createdAt':
        case 'updatedAt':
          return <></>
      default:
          return <>
            <label htmlFor={key}>{key}:</label>
            <input
              type="text"
              name={key}
              value={props.form[key]}
              onChange={props.handleChange}
            />
          </>
      }
    });
  }
  if (props.currentUser) {
    return (
      <>
        <h2>Create or Update Your Data</h2>
        {mapForm()}
        <button>CHANGE LOCATION</button>
      </>
    )
  } else {
    return <h1>No current user.</h1>
  }
};
export default ArtistProfile;
