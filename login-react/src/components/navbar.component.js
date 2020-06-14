import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  render() {
  
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <a className="navbar-brand" href="/" style={{ marginRight: '20px' }}>≺∕≻&nbsp; Pair Programming</a>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right" style={{ right: '0',  position: 'absolute', marginRight: '20px' }}>
              <li className="nav-item">
                  <Link to='/user/login'>Login</Link>
              </li>
              <li className="nav-item">
                  <Link to='/user/register'>Register</Link>
              </li>
          </ul>
        </div>
    </nav>
  );
}
}


