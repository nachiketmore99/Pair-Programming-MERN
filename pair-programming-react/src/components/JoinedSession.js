import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

var instance = axios.create({
	withCredentials: true
})

export default class JoinedSession extends Component{
	constructor(props) {
		super(props);
		this.state = {
			joined_session_list: [],
			response: false,
			isLoading: true,
			error: false,
			updateSession: false
		}
	  }


	update = async () =>{
		setInterval( this.joinedSessionList, 3000 )
	}
	
	componentDidMount() {
		var data = window.location.href.slice(window.location.href.indexOf('user=')+5).split('%2F')
        document.cookie = 'username='+data[0];
        document.cookie = 'email='+data[1];
        document.cookie = 'auth_token='+data[2];
		window.addEventListener('load', this.update );
	}

	// Child to Parrent: Callback function
	refreshList = () => {
		this.props.parentCallback("refresh");
	}

	// Child to Parrent: Callback function
	sendData = async (value) => {
		this.props.parentCallback(['/session/'+value.joined_session_name, value.session_id, value.admin]);
   	}

	verify(token) {
		if(token==''){ return false}
		else{ return true }
	}

	joinedSessionList = async () => {
		// var flag = false
		// while(flag==false){
		// 	if(document.cookie!=""){
		// 		flag=true;
		// 	}
		// }
		
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
		var token = cookie.auth_token
		const access = this.verify(token)
		if (access){
			const apiURL = "http://localhost:3000/session/joined";
			var count = 0; var maxTries = 5;
			while(count!=maxTries) {
				try{
					this.setState({ isLoading: true})
					const response = await axios.post(apiURL, {
							username: cookie.username
					},
					{
							headers: {
								'auth-token': token
							}
					})
					var i = 0; const joined_session_list =[]
					for(i=0; i<Object.values(response.data).length; i++){
						joined_session_list.push([Object.values(response.data)[i].session_name, Object.values(response.data)[i].session_id, Object.values(response.data)[i].admin])
					}
					count = maxTries;
					this.props.parentCallback('yes');

					this.setState({ 
						joined_session_list: joined_session_list,
						isLoading: false
					});
					if(this.state.joined_session_list.length!=0){ this.setState({
						response: true,
						isLoading: false,
						error: false, 
					}); }
				} catch (err) {
					// handle exception
					if (++count == maxTries) {
						this.setState({ isLoading: false, error: true })
						console.log('Could not connect to server :/') 
					}
					
				}
				this.setState({ isLoading: false})
			}
		}
		else { document.getElementById('logout').submit() }
	}


	openSession = (value) =>{
		console.log(value,' opened')
	}
	shareModal = (data) =>{
		console.log(data.value)
		this.props.shareCallback(data.value);
	}

    render() {
		const response = this.state.response;
		let elem;
		if(response) {
			elem = 	this.state.joined_session_list.map((value, key) => {
						const session_id = {value}.value[1]
						const joined_session_name = {value}.value[0]
						const admin = {value}.value[2]
						const to_url = '/session/'+joined_session_name
						return <li key={Math.random()}>
									<div onClick={this.sendData.bind(this, {joined_session_name, session_id, admin})} >
										<Link to={to_url}>
											<div className='col-sm-10 list-left'>
												<span className='member-name'>{joined_session_name}</span>
											</div>
											<div className='col-sm-2 list-right'>
												<span id='arrow'>&#10140;</span>
											</div>
										</Link>
									</div>
								</li>})
		} 
		// else {
		// 	elem = <span id='error'>Sessions not found!</span>
		// }
        return (
					<div id="member-list">
						{this.state.error && 
							<div id='error'>
								<svg className="bi bi-cloud-slash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path d="M3.901 6.023A3.5 3.5 0 1 0 3.5 13h7.379l-1-1H3.5a2.5 2.5 0 1 1 .423-4.965l.964.164.031-.16-1.017-1.016zm10.125 5.882a1.5 1.5 0 0 0-.289-2.886L12.7 8.854l.216-1.028a4 4 0 0 0-6.682-3.714l-.707-.708a5 5 0 0 1 8.368 4.626 2.501 2.501 0 0 1 .88 4.621l-.748-.746z"/>
									<path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.707.707z"/>
								</svg>
								<br></br>
								<span>Could not connect to the Server</span>
							</div>}
						<ul>
							{ elem }
						</ul>
					</div>
          );
    }

}


