import React, { Component } from 'react';
import {
  Route, Switch
} from 'react-router-dom';
import ArtistList from './ArtistList'
import NewArtistForm from './NewArtistForm'
import UpdateArtistForm from './UpdateArtistForm'

import { showArtists, createArtist, updateArtist, destroyArtist } from '../services/api-helper';
import '../App.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      form: {
        username: '',
        zipcode: '',
        website: ''
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

  showUpdateForm = (id) => {
    const artist = this.state.artists.find((comp) => comp.id === id);
    const { username, website, zipcode } = artist;
    this.setState({
      form: {
        id,
        username,
        zipcode,
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
        zipcode: '',
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

  render() {
    return (
      <div className="App">
        <h1>Donate to these Artists</h1>
        <Switch>
          <Route exact path='/' render={(props) => (
            <>
            <NewArtistForm
               form={this.state.form}
               handleChange={this.handleChange}
               handleSubmit={this.postArtist}
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
               <UpdateArtistForm
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

export default Main;
