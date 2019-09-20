import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

function Footer (props) {


  return (
     <footer>
       <span>&copy; 2019 Marie-France Han</span>&nbsp; &nbsp;
       <span><Link to="/">Home</Link></span>&nbsp; &nbsp;
         <span><Link to="/about">About This Project </Link></span>
     </footer>

  );
}

export default Footer;
