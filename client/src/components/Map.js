import React, {Component} from 'react';
import {
  Route, Switch, Redirect
} from 'react-router-dom';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import UpdateArtistForm from './UpdateArtistForm'
import ArtistList from './ArtistList'
import NewArtistForm from './NewArtistForm'

import 'mapbox-gl/dist/mapbox-gl.css';
import * as data from '../data.json';

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
    }
  };
}
  //
  // mapClick =(map, e)=>{
  //   console.log(map)
  //   this.setState({
  //     mapLat:map.lngLat[0],
  //     mapLng:map.lngLat[1],
  //     clicked: true,
  //   })
  // }


  render() {
    // {...this.state.viewport}
        //onViewportChange={(viewport) => this.setState({viewport})}

console.log(this.props)
  //   let redirect = this.props.clicked && <Redirect to={{
  //     pathname: "/nvf",
  //     state: {
  //       lat: this.state.mapLat,
  //       long: this.state.mapLng
  //     }
  // }}  />

    return (
      <div >
      <h2>Our Map</h2>

      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle = 'mapbox://styles/parisny/ck0lefyty5kux1cte8t6fukb6'
        onViewportChange = {(viewport) => this.setState({viewport})
        }
        onClick = {this.props.mapClicked}
        >
        {data.artists.map(artist => (
         <div
           key={artist.username}
           latitude={artist.lat}
           longitude={artist.long}
        >
        <button
              className="marker-btn"
              onlick={e => {
                e.preventDefault();
              }}
            >
        </button>

        </div>
      ))}
        </ ReactMapGL>
      </div>
    );
  }
}

export default Map;
