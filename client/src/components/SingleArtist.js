import React from 'react';

const SingleArtist = (props) => {
  console.log(props)
  return (
    <div className="single-artist">

    <h3>{props.artist.username}</h3>
    <p>Connect on their website: {props.artist.social1}.</p>
    </div>
  )
};

export default SingleArtist;
