import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

function Footer (props) {


  return (
     <footer>
       <p>&copy; 2019 Marie-France Han</p>
       <p ><Link to="/">Home</Link>
         <Link to="/about">About This Project</Link></p>
     </footer>

  );
}

export default Footer;
