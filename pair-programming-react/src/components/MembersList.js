import React, { Component } from 'react';
import axios from 'axios';

export default class MembersList extends Component{
    constructor(props) {
        super(props);
		this.state = {
            // response: true,
			// isLoading: false,
            // error: false,
            // showModal:false,
            // session_live: '',
            // isSession: false,
            // member_list: [],
            // isMemberLoading: false
		}
      }


	
	verify(token) {
		if(token==''){ return false}
		else{ return true }
    }
    
    removeMember = async (data) => {
        console.log('deleting member: ', data.value, 'from session: ', data.name)
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
			const apiURL = "http://localhost:3000/session/exit";
					const response = await axios.post(apiURL, {
                            username: data.value,
                            session_name: data.name
					},
					{
							headers: {
								'auth-token': token
							}
					})
					console.log('from api: ', response.data)
					this.setState({ 
						isLoading: false
					});
					this.props.parentCallback();
		}
    }
    
    render() {
		var value = this.props.value;
		var name = this.props.name;
        return (
			
			<a className="dropdown-item" key={Math.random()}>{value} 
                <svg style={{ color: '#e14a31' }} onClick={this.removeMember.bind(this, {value, name})} className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                    <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                </svg>
            </a>
      );

    }

}


