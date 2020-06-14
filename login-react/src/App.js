import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from "./components/navbar.component";
import UserLogin from "./components/user-login.component";
import UserRegister from "./components/user-register.component";

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./components/alert.component";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

export default class App extends Component{
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <br />

          <Route path='/user/register' component={UserRegister}></Route>
          <Route path='/user/login' component={UserLogin}></Route>

        </Router>
        <Provider template={AlertTemplate} {...options}>
          <Alert />
        </Provider>
        <span id='dev'>Designed &amp; Developed By Nachiket More. 😉</span>
      </div>
    );
  }
} 
