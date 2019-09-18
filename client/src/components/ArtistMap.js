import React, {Component} from 'react';
import {
  Route, Switch, Redirect
} from 'react-router-dom';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import ArtistProfile from './ArtistProfile'
import ArtistList from './ArtistList'
import SingleArtist from './SingleArtist'
import InfoContent from './InfoContent'
import Pin from './Pin'
//import NewArtistForm from './NewArtistForm'

import 'mapbox-gl/dist/mapbox-gl.css';
//import * as data from '../data.json';

class Map extends Component {
  constructor(props){
    super(props)

  this.state = {
    viewport: {
      width: "80vw",
      height: "50vh",
      latitude: 40.753345,
      longitude: -73.9841719,
      showPopup: true,
      zoom:14,
      minZoom: 10,
      maxZoom: 20,
    },
    showPopup: true,
    popupInfo: null
  };
}

_renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.long}
          latitude={popupInfo.lat}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <InfoContent info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {

console.log(this.props)

    return (
      <div >
      <h2>Our Map</h2>

      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle = 'mapbox://styles/parisny/ck0lefyty5kux1cte8t6fukb6'
        onViewportChange = {(viewport) => this.setState({viewport})
      }
      >

        {this.props.artists.map(artist => (
         <Marker
           key={artist.username}
           latitude={artist.lat}
           longitude={artist.long}
        >
          {artist.username}
         <Pin size={20} onClick={() => this.setState({popupInfo:artist})} />
        </Marker>
      ))}
      {this._renderPopup()}
        </ ReactMapGL>
      </div>
    );
  }
}

export default Map;
