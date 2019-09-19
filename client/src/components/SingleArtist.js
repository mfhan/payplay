import React from 'react';
import '../App.css';

const SingleArtist = (props) => {
  console.log(props)
  return (
    <div >

    <h3>{props.artist.username}</h3>
      <p>{props.artist.intro}; {props.artist.social1}.</p>
    </div>
  )
};

export default SingleArtist;
