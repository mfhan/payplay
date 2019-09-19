import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

function Footer (props) {


  return (
     <footer>
       <li>&copy; 2019 Marie-France Han</li>
       <li ><Link to="/">Home</Link></li>
       <li ><Link to="/about">About This Project</Link></li>
     </footer>

  );
}

export default Footer;
