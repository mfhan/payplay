//import React, { useState } from 'react';
import React, {Component} from 'react';
import {
  Redirect, Route, Switch
} from 'react-router-dom';
import ReactMapGL from 'react-map-gl';
import ArtistList from './components/ArtistList'
import NewArtistForm from './components/NewArtistForm'
import UpdateArtistForm from './components/UpdateArtistForm'
import Map from './components/Map'

import { showArtists, createArtist, updateArtist, destroyArtist } from './services/api-helper';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      form: {
        username: '',
        lat: '',
        long: '',
        website: ''
      },
      mapLat:null,
      mapLong:null,
      clicked:false,
      }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      }
    }));
  }


  mapClick =(map, e)=>{
      console.log('this is app inside function', map)
      this.setState({
        mapLat:map.lngLat[0],
        mapLong:map.lngLat[1],
        clicked: true,
      })
    }


  showUpdateForm = (id) => {
    const artist = this.state.artists.find((comp) => comp.id === id);
    const { username, lat, long, website } = artist;
    this.setState({
      form: {
        id,
        username,
        lat,
        long,
        website
      }
    });

  }

  getArtists = async () => {
    const artists = await showArtists()
    this.setState({ artists })
  }

  postArtist = async (e) => {
    e.preventDefault();
    const data = this.state.form;
    const newArtist = await createArtist()
    // call the createComposer fn()
    // and pass it the necessary data
    this.setState((prevState) => ({
      artists: [...prevState.artists, newArtist]
    }));
  }

  updateArtist = async (e) => {
    e.preventDefault();
    const { id, ...data } = this.state.form;
    const artist = await updateArtist(data, id)
    // call the updateComposer fn()
    // and pass it the necessary data
    this.setState((prevState) => ({
      artists: [...prevState.artists.filter((comp) => comp.id !== id), artist],
      form: {
        username: '',
        lat: '',
        long: '',
        website:''
      }
    }));
  }

  destroyArtist = async (id) => {
    // call the destroyComposer fn()
    // and pass it the necessary data
    this.setState((prevState) => ({
      artists: [...prevState.artists.filter((artist) => artist.id !== id)]
    }));
  }

  componentDidMount() {
    console.log('Hey guys, componentDidMount!')
    this.getArtists()

  }

// ? 'news-list' : 'news-list-pre'
  render() {
    const mapIsClicked = (this.state.clicked)  && <Redirect to={{
      pathname: "/new",
      state: {
        lat: this.state.mapLat,
        long: this.state.mapLng
      }
    }}  />


    return (
      <div className="App">
      {mapIsClicked}
    <h1>Artists: Add your Location</h1>
    <Switch>
    <Route exact path='/new' render={(props) => (

      <NewArtistForm
         form={this.state.form}
         handleChange={this.handleChange}
         handleSubmit={this.postArtist}
         lat = {this.state.mapLat}
         long= {this.state.mapLong}
          />
     )} />

      <Route exact path='/' render={(props) => (
        <>

            <Map
            mapClicked ={this.mapClick}
            clicked = {this.clicked}
           />
             <ArtistList
               {...props}
               artists={this.state.artists}
               handleDelete={this.destroyArtist}
               showUpdateForm={this.showUpdateForm}
             />


          </>
         )} />


           <Route path='/edit/:id' render={(props) => {
             return (
               <
               UpdateArtistForm
                 {...props}
                 form={this.state.form}
                 handleChange={this.handleChange}
                 handleSubmit={this.updateArtist}
               />
             )
           }} />


        </Switch>
      </div>
    );
  }
}

export default App;


//previously:

          // <Route exact path='/' render={(props) => (
          //   <>
          //   <Map />
          //   <NewArtistForm
          //      form={this.state.form}
          //      handleChange={this.handleChange}
          //      handleSubmit={this.postArtist}
          //    />
