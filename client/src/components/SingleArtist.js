import React from 'react';
import '../App.css';

const SingleArtist = (props) => {
  console.log(props)
  return (
    <div className = "home-profile">
      <h3>{props.artist.username}</h3>
      <p>{props.artist.intro} &nbsp; <strong>GENRE:</strong> {props.artist.genre1} &nbsp;  <span>  <a href={`${props.artist.social1}`} target="_blank" rel="noopener noreferrer">Contact</a> </span></p>
    </div>
  )
};

export default SingleArtist;
