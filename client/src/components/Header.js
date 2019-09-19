import React, {Component}  from 'react';
import {  Redirect, Route, Link , Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import Login from './Login'
import Register from './Register'
import { loginUser, registerUser } from '../services/api-helper';
import '../App.css';

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
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


  componentDidMount() {
    console.log('Header componentDidMount!')
    // this.getArtists()
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
      <header className="page-title">
        <Link to="/"><h1>PAYPLAY</h1></Link>
        <h2>Support Street Artists!</h2>
          {this.state.currentUser
            ?
            <div>
              <Redirect to = {`./edit/${this.state.currentUser.id}`} />
              <h3>Hi {this.state.currentUser && this.state.currentUser.username}<button onClick={this.handleLogout}>Log Out</button></h3>
              <hr />
            </div>
            :
            <button className ="content-button"  onClick={this.handleLoginButton}>Artists: Create or Update your profiles!</button>
          }
      </header>
    );
  }
}

export default withRouter(Header);
