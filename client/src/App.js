//import React, { useState } from 'react';
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Map from './components/Map'
import ArtistProfile from './components/ArtistProfile'
import ArtistList from './components/ArtistList'
import About from './components/About'
import Footer from './components/Footer'
import { loginUser, registerUser, verifyUser, showArtists, showOneArtist, updateArtist} from './services/api-helper';
import './App.css';

class App extends Component {
  constructor(props){
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
      localStorage.setItem("jwt", userData.token.token)
      this.setState({
        currentUser: userData.user,
        form: userData.user
        // form is added here
      });
    }

  handleVerify = async()=>{
    //get the token from localStorage
    const token = localStorage.getItem("jwt");
    //IF there is a token, verify the user with a token
    console.log(token)
     if (token) {
       const user = await verifyUser(token);
      //we will assign formattedUser as currentUser
      this.setState({
        currentUser: user,
        form: user
      })
    }
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
      this.props.history.push('/')
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


  handleChangeLocation =(e)=>{
    e.preventDefault()
    this.setState(prevState =>({
      changingLocation: true
    }))
  }


  mapClick =(map, e)=> {
    if (!this.state.changingLocation) {
      return;
    }
      console.log('this is mapClick', map)
      this.setState(prevState => ({
          form: {
            ...prevState.form,
            lat: map.lngLat[1],
            long: map.lngLat[0],
          },
          changingLocation: false
        }))
  }

  // clickRedirect=() => {
  //   this.props.history.push('/')
  // }
        // spread the rest of prevState
        // spread the rest of prevState.form
        // change lat and long to map.lngLat etc.
        //mapLat:map.lngLat[0],
        //mapLong:map.lngLat[1],
        //clicked: true,
        //changingLocation: false


  getArtists = async () => {
    const artists = await showArtists()
    this.setState({ artists })
  }

  getArtistById  = async (id) => {
    const oneArtist = await showOneArtist(id)
    this.setState({ oneArtist })
  }

  changeArtistForm = async (e) => {
    e.preventDefault();
    const { id, ...data } = this.state.form;
    const artist = await updateArtist(data, id)
    this.setState((prevState) => ({
      artists: [...prevState.artists.filter((comp) => comp.id !== id), artist]
    }));
    console.log(artist)
    this.props.history.push('/')
  }

  async componentDidMount() {
    console.log('Hey guys, componentDidMount!')
    await this.getArtists()
    await this.handleVerify()
  }

  render() {

    return (
      <div className="App">
        <Header
          currentUser = {this.state.currentUser}
          handleLoginButton = {this.handleLoginButton}
          handleLogout = {this.handleLogout}
        />

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


        <div className="main-content">
          <Map
            artists={this.state.artists}
            changingLocation={this.state.changingLocation}
            mapClick={this.mapClick}
          />
          <Switch>
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
                 handleChangeLocation={this.handleChangeLocation}
                 handleSubmit={this.changeArtistForm}

                  /> )}
            />
            <Route path='/about' component={About} />
            </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
