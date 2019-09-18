import React, {Component}  from 'react';
import { showOneArtist } from '../services/api-helper';


class ArtistProfile extends Component {
  // constructor(this.props) {
  //   super(this.props);
  // }

    getArtistById  = async (id) => {
      const oneArtist = await showOneArtist(id)
      this.setState({ oneArtist })
    }

      render() {
        console.log(this.props)
  if (this.props.currentUser) {
    return (
      <>
        <h2>Create or Update Your Data</h2>
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            name="username"
            value={this.props.form.username}
            onChange={this.props.handleChange}
          />
          <label htmlFor="lat">Latitude:</label>
          <input
            type="number"
            name="lat"
            value={this.props.form.lat}
            onChange={e => this.props.handleChange(e)}
            />
            <label htmlFor="long">longitude:</label>
            <input
              type="number"
              name="long"
              value={this.props.form.long}
              onChange={e => this.props.handleChange(e)}
              />
            <label htmlFor="website">Social Media 1:</label>
            <input
              type="text"
              name="social1"
              value={this.props.form.social1}
              onChange={this.props.handleChange}
            />
            <label htmlFor="intro">Write a brief intro!</label>
            <input
              type="text"
              name="intro"
              value={this.props.form.intro}
              onChange={this.props.handleChange}
            />
          <button type="submit">Submit!</button>
        </form>
      </>
      )
    }
  }
};

export default ArtistProfile;
