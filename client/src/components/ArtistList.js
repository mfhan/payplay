import React from 'react';
import SingleArtist from './SingleArtist';

const ArtistList = (props) => {
  console.log(props)
  return (
    <>
      { props.artists.map((artist) => {
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
