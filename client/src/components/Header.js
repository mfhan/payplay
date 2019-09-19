import React, {Component}  from 'react';
import {  Redirect, Route, Link , Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import Login from './Login'
import Register from './Register'
import { loginUser, registerUser } from '../services/api-helper';
import '../App.css';

const Header =(props)=>{


    return (
      <header className="title">
        <Link to="/"><h1 >PAYPLAY</h1></Link>
        <h2>Support Street Artists!</h2>
          {props.currentUser
            ?
            <div>
              <Redirect to = {`./edit/${props.currentUser.id}`} />
              <h3>Hi {props.currentUser && props.currentUser.username}<button onClick={props.handleLogout}>Log Out</button></h3>
              <hr />
            </div>
            :
            <button className ="login-button"  onClick={props.handleLoginButton}>Artists: Create or Update your profiles!</button>
          }
      </header>
    );
}

export default withRouter(Header);
