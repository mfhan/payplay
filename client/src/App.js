//import React, { useState } from 'react';
import React, {Component} from 'react';
import {  Redirect, Route, Link , Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
// jwt-decode lets us decode json web token and access the data in them
import decode from 'jwt-decode';
import Login from './components/Login'
import Register from './components/Register'
import ArtistList from './components/ArtistList'
import ArtistProfile from './components/ArtistProfile'
import Map from './components/Map'

import { loginUser, registerUser, showArtists, showOneArtist, createArtist, updateArtist, destroyArtist } from './services/api-helper';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      artists: [],
      form: {
        username: '',
        lat: '',
        long: '',
        intro: ''
      },
      mapLat:null,
      mapLong:null,
      clicked:false,
      login: {
        username: '',
        password: '',
      },
      register: {
        username: '',
        email: '',
        password: '',
      },
      authFormData: {
        username: "",
        password: "",
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
      console.log('props login click', this.props)
      const userData = await loginUser(this.state.authFormData);
      localStorage.setItem("jwt", userData.token)
      this.setState({
        currentUser: userData.user,
        form: userData.user
        // form is added here
      });
    }

  handleLoginButton = () => {
   console.log('props from login/register button', this.props)
   this.props.history.push("/login");
  }

    // Function to register a user
    // After register, we just call the login function with the same data
    handleRegister = async (e) => {
      console.log('props register click', this.props)
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

  getArtists = async () => {
    const artists = await showArtists()
    this.setState({ artists })
  }

  getArtistById  = async (id) => {
    const oneArtist = await showOneArtist(id)
    this.setState({ oneArtist })
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
        social1:'',
        intro:''
      }
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
        <Redirect to = {`./edit/${this.state.currentUser.id}`} />

          <h3>Hi {this.state.currentUser && this.state.currentUser.username}<button onClick={this.handleLogout}>Log Out</button></h3>
          <hr />
        </div>
        :
        <button onClick={this.handleLoginButton}>Artists: Create or Update your profiles!</button>

      }

      </header>
      <Switch>
      <Route exact path="/login" render={(props) => (
        <Login
          handleLogin={this.handleLogin}
          handleChange={this.authHandleChange}
          formData={this.state.authFormData} /> )}
      />

      <Route exact path="/register" render={(props) => (
        <Register
          handleRegister={this.handleRegister}
          handleChange={this.authHandleChange}
          formData={this.state.authFormData} />)}
      />

      <Route exact path='/' render={(props) => (
        <>
          <ArtistList
             {...props}
             artists={this.state.artists}
           />
        </> )}
        />

       <Route path='/edit/:id' render={(props) => (
           <ArtistProfile
             {...props}
             currentUser = {this.state.currentUser}
             form={this.state.form}
             handleChange={this.handleChange}
             handleSubmit={this.updateArtist} /> )}
        />
        </Switch>

       <h2>Support Street Artists!</h2>

       <Map
         artists={this.state.artists}
       />
      </div>
    );
  }
}

export default withRouter(App);
