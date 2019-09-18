import React from 'react';

const SingleArtist = (props) => {
  console.log(props)
  return (
    <div className="single-artist">

    <h3>{props.artist.username}</h3>
    <p>Donate to their website: {props.artist.social1}.</p>
    <button onClick={() => props.showUpdateForm(props.artist.id)}>EDIT</button>
    <button onClick={() => props.handleDelete(props.artist.id)}>DELETE</button>

    </div>
  )
};

export default SingleArtist;
