import React from 'react';
import SingleArtist from './SingleArtist';

const ArtistList = (props) => {
  return (
    <>
      { props.artists.map((artist) => {
        return (
          <SingleArtist
            key={artist.id}
            artist={artist}
            showUpdateForm={props.showUpdateForm}
            handleDelete={props.handleDelete}
          />
        )
      }) }
    </>
  )
};

export default ArtistList;
