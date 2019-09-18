//import React, { useState } from 'react';
import React, {Component} from 'react';
import {  Route, Link , Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
// jwt-decode lets us decode json web token and access the data in them
import decode from 'jwt-decode';
import Login from './components/Login'
import Register from './components/Register'
import ArtistList from './components/ArtistList'
import ArtistProfile from './components/ArtistProfile'
import Map from './components/Map'

import { loginUser, registerUser, showArtists, createArtist, updateArtist, destroyArtist } from './services/api-helper';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      artists: [],
      // form: {
      //   username: '',
      //   lat: '',
      //   long: '',
      //   intro: ''
      // },
      mapLat:null,
      mapLong:null,
      clicked:false,
      // login: {
      //   username: '',
      //   password: '',
      // },
      // register: {
      //   username: '',
      //   email: '',
      //   password: '',
      // },
      authFormData: {
        username: "",
        password: ""
      }
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


  handleLogin = async () => {
      const userData = await loginUser(this.state.authFormData);
      this.setState({
        currentUser: userData.user
      })
      localStorage.setItem("jwt", userData.token)
    }

  handleLoginButton = () => {
   console.log('props from login/register button', this.props)
   this.props.history.push("/login");
  }

    // Function to register a user
    // After register, we just call the login function with the same data
    handleRegister = async (e) => {
      e.preventDefault();
      await registerUser(this.state.authFormData);
      this.handleLogin();
    }

    handleLogout = () => {
        localStorage.removeItem("jwt");
        this.setState({
          currentUser: null
        })
      }

      // Handle change function for the auth forms
      authHandleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
          authFormData: {
            ...prevState.authFormData,
            [name]: value
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
    const checkUser = localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState({
        currentUser: user
      })
    }
  }

  render() {

    return (
      <div className="App">
        <header>
        <Link to="/"><h1>PayPlay</h1></Link>
      {this.state.currentUser
        ?
        <div>
          <h3>Hi {this.state.currentUser && this.state.currentUser.username}<button onClick={this.handleLogout}>Log Out</button></h3>
          <hr />
        </div>
        :

        <button onClick={this.handleLoginButton}>Artists: Create or Update your profiles!</button>

      }
      </header>

      <Route exact path="/login" render={(props) => (
      <Login
        handleLogin={this.handleLogin}
        handleChange={this.authHandleChange}
        formData={this.state.authFormData} />)} />
      <Route exact path="/register" render={(props) => (
      <Register
        handleRegister={this.handleRegister}
        handleChange={this.authHandleChange}
        formData={this.state.authFormData} />)
      } />

      <h2>Support Street Artists!</h2>

      <Map
        artists={this.state.artists}
      />

      <Route exact path='/' render={(props) => (
        <>
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
           <ArtistProfile
             {...props}
             form={this.state.form}
             handleChange={this.handleChange}
             handleSubmit={this.updateArtist}
           />
         )
       }} />


      </div>
    );
  }
}

export default withRouter(App);
