import React, { Component } from 'react';

export default class Members extends Component{

    render() {
        return (
            <ul id="member-list">
                <h6>Members</h6>
                <hr />
                <div id="member-container">
                    <li>1st User</li>
                    <button className="button">REMOVE</button>
                </div>
                <div id="member-container">
                    <li>2nd User</li>
                    <button className="button">REMOVE</button>
                </div>
            </ul>
          );
    }

}


