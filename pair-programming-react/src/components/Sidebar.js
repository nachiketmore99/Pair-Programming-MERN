import React, { Component } from 'react';
import CreateProject from './CreateModal';
import Projects from './Projects'; 
import Sessions from './Sessions';
import Members from './Members';
import { Modal, Button } from 'react-bootstrap';

export default class Sidebar extends Component{
    
    constructor() {
        super(); 
        this.state = { 
            showMembers: false,
            show: false
        }
      }
    
      _showMembers = (bool) => {
        this.setState({
          showMessage: bool
        });
      }
      showModal = (bool) => {
        this.setState({ show: 'true' });
        console.log(this.state.show)
      };
  
      hideModal = (bool) => {
        this.setState({ show: bool });
      };
    render() {
        return (
                <div id="sidebar">
                    <button onClick={ this.showModal.bind(null, true) }>Show Modal</button>
                    <Projects />
                    <Sessions />

                </div>
          );
    }

}


