import React from 'react';


const ArtistProfile = (props) => {
console.log(props)
  if (props.form.id) {
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
          <label htmlFor="lat">Latitude:</label>
          <input
            type="number"
            name="lat"
            value={props.form.lat}
            onChange={e => props.handleChange(e)}
            />
            <label htmlFor="long">longitude:</label>
            <input
              type="number"
              name="long"
              value={props.form.long}
              onChange={e => props.handleChange(e)}
              />
            <label htmlFor="website">Social Media:</label>
            <input
              type="text"
              name="website"
              value={props.form.website}
              onChange={props.handleChange}
            />
            <label htmlFor="intro">Write a brief intro!</label>
            <input
              type="text"
              name="intro"
              value={props.form.intro}
              onChange={props.handleChange}
            />
          <button type="submit">Submit!</button>
        </form>
      </>
    )
  } else if (!props.form.id) {
    return (
      <>
        <h2>Create Your Entry!</h2>
        <form onSubmit={e => props.postArtist(e)}>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            name="username"
            value={props.form.username}
            onChange={e => props.handleChange(e)}
            />
          <label htmlFor="lat">Latitude:</label>
          <input
            type="number"
            name="lat"
            value={props.form.lat}
            onChange={e => props.handleChange(e)}
            />
            <label htmlFor="long">longitude:</label>
            <input
              type="number"
              name="long"
              value={props.form.long}
              onChange={e => props.handleChange(e)}
              />
          <label htmlFor="website">Social Media, Youtube Link, Instagram:</label>
          <input
            type="text"
            name="website"
            value={props.form.website}
            onChange={e => props.handleChange(e)}
          />
          <label htmlFor="intro">Write a brief intro!</label>
          <input
            type="text"
            name="intro"
            value={props.form.intro}
            onChange={props.handleChange}
          />
          <button type="submit">Submit!</button>
        </form>
      </>
    )
  }
};

export default ArtistProfile;
