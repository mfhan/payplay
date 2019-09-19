import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup } from 'react-map-gl';
import InfoContent from './InfoContent'
import Pin from './Pin'
import '../App.css';


import 'mapbox-gl/dist/mapbox-gl.css';
//import * as data from '../data.json';

class Map extends Component {
  constructor(props){
    super(props)

  this.state = {
    viewport: {
      width: "100%",
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
    console.log('renderPopup state', popupInfo)
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
    //console.log(this.props)
    //const {viewport} = this.state;
    return (
      <div >
        <h3>Discover Artists in Your Area</h3>

          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle = 'mapbox://styles/parisny/ck0lefyty5kux1cte8t6fukb6'
            onViewportChange = {(viewport) => this.setState({viewport})
          }
          >

            {this.props.artists.map(artist => (

               <Marker
                 key = {artist.username}
                 latitude = {artist.lat}
                 longitude = {artist.long}
                 offsetLeft={-20}
                 offsetTop={-10}
                >
                <div> {artist.username} </div>
                <Pin size={12} onClick={() =>this.setState({popupInfo:artist})} />
              </Marker>

          ))}

          {this._renderPopup()}

        </ ReactMapGL>
      </div>
    );
  }
}

export default Map;


  //
  // _renderCityMarker = (artist, index) => {
  //     return (
  //       <Marker key={`marker-${index}`} longitude={artist.long} latitude={artist.lat}>
  //         <CityPin size={20} onClick={() => this.setState({popupInfo: artist})} />
  //       </Marker>
  //     );
  //   };
