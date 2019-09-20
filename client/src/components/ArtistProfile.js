import React  from 'react';

const ArtistProfile = (props) => {
  const mapForm = () => {
    return Object.keys(props.form).map((key) => {
      switch(key) {
        case 'id':
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
        <h2 className = "main-content">Create or Update Your Data</h2>
        <button className="content-button"  onClick={props.handleChangeLocation} >CHANGE LOCATION</button>

          {mapForm()}

        <button  className="content-button"  onClick={props.handleSubmit} >Submit</button>

      </>
    )
  } else {
    return <h1>No current user.</h1>
  }
};
export default ArtistProfile;

// <button onClick= {() => {
//     this.setState({ })
//   }} >UPDATE ALL</button>
