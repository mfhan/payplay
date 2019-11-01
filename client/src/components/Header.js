import React  from 'react';
import {  Redirect, Link} from 'react-router-dom';
import { withRouter } from 'react-router';
import '../App.css';

const Header =(props)=>{

    //
    // <Link to = '/'><h1>Welcome to WorkHaven!</h1> </Link>
    // { this.state.currentUser
    //   ?
    //   <>
    //   <p>Let's get to work, {this.state.currentUser.email}</p>
    //   <button onClick= {this.handleLogout}>Log Out</button>
    //   </>
    //   :
    //   <Link to = '/login'><button>Log In/Register</button></Link>
    // }



    return (
      <header className="title">

          {props.currentUser
            ?
            <div>
              <Redirect to = {`/edit/${props.currentUser.id}`} />
              <h3>Hi {props.currentUser && props.currentUser.username}
              <button  className="content-button"  onClick={props.handleLogout}>Log Out</button>
              <Link className="content-button"   to={`/edit/${props.currentUser.id}`}> Back to Profile</Link>
              </h3>
              <hr />
            </div>
            :
            <button className ="login-button"  onClick={props.handleLoginButton}>Artists: Register or Log In</button>
          }
          <Link to="/"><h1 >PAYPLAY</h1></Link>

          <h2>Support Street Artists!</h2>
      </header>
    );
}

export default withRouter(Header);
