import React from 'react';
import '../App.css';

const SingleArtist = (props) => {
  console.log(props)
  return (
    <div >

    <h3>{props.artist.username}</h3>
    <p>Connect on their website: {props.artist.social1}.</p>
    </div>
  )
};

export default SingleArtist;
