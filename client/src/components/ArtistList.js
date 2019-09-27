import React from 'react';
import SingleArtist from './SingleArtist';
import '../App.css';

const ArtistList = (props) => {
  console.log(props)
  return (
    <>
    <h3>Discover Artists in Your Area:</h3>
      {props.artists.map((artist) => {
        console.log(props.artists)
        return (
          <SingleArtist
            key={artist.id}
            artist={artist}
          />
        )
      }) }
    </>
  )
};

export default ArtistList;
