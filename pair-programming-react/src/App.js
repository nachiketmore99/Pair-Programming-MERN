import React, { useState, Component }  from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Content from './components/Content';
import Projects from './components/Projects'; 
import Sessions from './components/Sessions';
import JoinedSession from './components/JoinedSession';

import CreateModal from './components/CreateModal';
import Share from './components/Share';
import JoinModal from './components/JoinModal';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      showModal:false,
      isLoading: false,
      id: '',
      message: '',
      link: '',
      create: '',
      admin: '',
      project_load: false,
      session_load: false,
      joined_load: false
    }

  }

  //onLoad to verify request
  componentDidMount() {
    window.addEventListener('load', this.verify.bind(this) );
    
  }

  getCookies = () => {
			var pairs = document.cookie.split(";");
			var cookies = {};
			for (var i=0; i<pairs.length; i++){
			  var pair = pairs[i].split("=");
			  cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
			}
			return cookies;
    }

  verify = async () => {
    console.log('verifying request')

        var data = window.location.href.slice(window.location.href.indexOf('user=')+5).split('%2F')
        document.cookie = 'username='+data[0];
        document.cookie = 'email='+data[1];
        document.cookie = 'auth_token='+data[2];
    var getCookies = function(){
      var pairs = document.cookie.split(";");
      var cookies = {};
      for (var i=0; i<pairs.length; i++){
          var pair = pairs[i].split("=");
          cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
      }
      return cookies;
    }
    var cookie = getCookies()

      const token = cookie.auth_token
      if(token=='' || token==null || token==undefined || token=='undefined'){ 
        document.getElementById('logout').submit()
       }
      else{ 
        console.log('User verified')

        document.getElementById('user_name').innerText = 'Logged in as '+cookie.username;
        document.getElementById('body').style.opacity = '1'
        document.getElementById('body').style.animation = '1s fadeIn 1'

        var interval = setInterval(() => {
          if(this.state.project_load==true && this.state.session_load==true && this.state.joined_load==true){
              window.history.pushState('page2', 'Title', '/');
              console.log('Everything Loaded')
              clearInterval(interval);
          }
        }, 500);

      }


    }
  
  // Child to Parrent: Callback function from child
  callbackFunction = (childData) => {
    this.setState({message: childData})
    console.log('Msg from Child: ',childData )
    // refreshing both project and session list
      this.refs.projectComp.fetchData();
      this.refs.sessionComp.activeSession();
      this.refs.joined_sessionComp.joinedSessionList();
  }

  // Child to Parrent: Callback function from Project Link
    callbackProject = (childData) => {
      if(childData=='yes'){
        this.setState({ project_load: true })
      }
      else{
        this.setState({
          link: childData,
          id: '',
          admin: ''
        })
      }
      // console.log('Data from Project Comp: ', childData)
    }
  // Child to Parrent: Callback function from Session Link
    callbackSession = (childData) => {
      if(childData=='yes'){
        this.setState({ session_load: true })
      }
      else{
        this.setState({
          link: childData[0],
          id: childData[1],
          admin: ''
        })
      }
      // console.log('Data from Session Comp: ', childData)
      // console.log(this.state.link, this.state.id)
    }

    callbackJoinedSession = (childData) => {
      if(childData=='yes'){
        this.setState({ joined_load: true })
      }
      else{
        this.setState({
          link: childData[0],
          id: childData[1],
          admin: childData[2]
        })
      }
      //console.log('Data from Joined Session: ', childData)
      //console.log(this.state.link, this.state.id, this.state.admin)
    }

    shareSession = (childData) => {
      this.setState({
        id: childData
      })
    }

  handleClick(create, e){
      this.setState({
        showModal:true,
        create: create
      });     
  }
  _showModal(){
      switch (this.state.create){
        case 'project': return <CreateModal parentCallback={this.callbackFunction} create={'Project'} />
        case 'session': return <CreateModal parentCallback={this.callbackFunction} create={'Session'} />
      }
      
  }

  _shareModal(){
      return <Share session_id={this.state.id} />
  }

  _JoinModal(){
    return <JoinModal parentCallback={this.callbackFunction}/>
  }


  render(){
    return (
    <Router>
      <div className="App">
        <div id="sidebar">
            <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <svg className="bi bi-chevron-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <span>Projects</span>
                    </button>
                  </h5>
                </div>

                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                      <div className="col-sm-12 card-top">
                        <button data-toggle="modal" data-target="#Modal" onClick={this.handleClick.bind(this, 'project')} className="button" id="create-project">Create Project</button>
                      </div>
                      <div className="col-sm-12 card-bottom">
                        <Projects ref="projectComp" parentCallback={this.callbackProject}/>
                      </div> 
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <svg className="bi bi-chevron-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <span>Sessions</span>
                    </button>
                  </h5>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body">
                      <div className="col-sm-12 card-top">
                        <button  data-toggle="modal" data-target="#Modal" onClick={this.handleClick.bind(this, 'session')} className="button" id="create-session">Create Session</button>
                      </div>
                    <div className="col-sm-12 card-bottom"> 
                      <Sessions ref="sessionComp" parentCallback={this.callbackSession} shareCallback={this.shareSession} />
                    </div>
                  </div>
                </div>
              </div>
              




              <div className="card">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                        <svg className="bi bi-chevron-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <span>Joined Sessions</span>
                    </button>
                  </h5>
                </div>
                <div id="collapseThree" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body">
                      <div className="col-sm-12 card-top">
                          <button data-toggle="modal" data-target="#Modal-join" className="button" id="join-session">Join</button>                      
                      </div>
                    <div className="col-sm-12 card-bottom"> 
                      <JoinedSession ref="joined_sessionComp" parentCallback={this.callbackJoinedSession}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
        <Route render={(props) => <Content parentCallback={this.callbackFunction} link={this.state.link} id={this.state.id} admin={this.state.admin} />} path= {this.state.link}></Route>
        {/* <Route render={(props) => <Content link={this.state.session_link} />} path= {this.state.session_link}></Route> */}
        {this._showModal()}
        {this._shareModal()}
        {this._JoinModal()}
      </div>
    </Router>
    );
  }
}

