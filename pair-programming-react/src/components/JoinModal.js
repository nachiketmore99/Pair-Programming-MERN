import React, { useState, Component }  from 'react';
import axios from 'axios';

export default class JoinModal extends Component {
	constructor(){
		super();
		this.state = {
		  showModal:'',
		  isLoading: false,
		  value: '',
		  session_link: '',
		  sessionId: false
		}
	  }

	handleChange(event) {
		this.setState({value: event.target.value});
	  }
	
	joinSession = async (event) => {

		var link = this.state.value
		var session_id = link.slice(link.lastIndexOf('-')+1, link.length)
		document.getElementById('error-dialog').style.animation = 'none';
		document.getElementById('error-dialog').style.opacity = '0';
		console.log('api called')
		this.setState({isLoading: true}); 
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
		var req = {
			username: cookie.username,
			email: cookie.email,
			session_id: session_id,
		}
		
		const apiURL = "http://localhost:3000/member/add";
		console.log('value submitted: ', req)
		const response = await axios.post(apiURL, req ,
			{
				headers: {
					'auth-token': cookie.auth_token
				}
			})
		console.log('from api: ',response.data)
		if(response.data.includes("already")){
			document.getElementById('error-dialog-msg').innerHTML = response.data;
			document.getElementById('error-dialog').style.opacity = '1';
			document.getElementById('error-dialog').style.animation = 'error-dialog 3s ease normal';
			this.setState({isLoading: false});
		}
		else{
			this.setState({isLoading: false}); 
			document.getElementById('modal-close').click()
			document.getElementById('dialog-msg').innerHTML = response.data;
			document.getElementById('dialog').style.animation = 'dialog 3s ease normal';
			document.getElementById('dialog').style.opacity = '1';

		}
		this.props.parentCallback("refresh");
	  }
	
  render(){
      return (
	<div>
		<div id="dialog">
			<div id='dialog-left' className='col-sm-2'>
				<svg className="bi bi-file-earmark-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path d="M9 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5v2.5A1.5 1.5 0 0 0 10.5 6H13v2h1V6L9 1z"/>
					<path fillRule="evenodd" d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z"/>
				</svg>
			</div>
			<div id='dialog-right' className='col-sm-10'>
				<span id='dialog-msg'>Dialog Msg</span>
			</div>
		</div>
        <div className="modal fade" id="Modal-join" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div id="error-dialog">
					<div id='dialog-left' className='col-sm-2'>
						<svg className="bi bi-exclamation-triangle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
							<path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
						</svg>
					</div>
					<div id='dialog-right' className='col-sm-10'>
						<span id='error-dialog-msg'>Error Msg</span>
					</div>
				</div>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content" style={{ height:'fit-content' }}>
						<div className="modal-header" style={{ borderBottom:'0' }}>
								<svg className="bi bi-link" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
									<path d="M6.764 6.5H7c.364 0 .706.097 1 .268A1.99 1.99 0 0 1 9 6.5h.236A3.004 3.004 0 0 0 8 5.67a3 3 0 0 0-1.236.83z"/>
									<path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
									<path d="M8 11.33a3.01 3.01 0 0 0 1.236-.83H9a1.99 1.99 0 0 1-1-.268 1.99 1.99 0 0 1-1 .268h-.236c.332.371.756.66 1.236.83z"/>
								</svg>
							<h5 className="modal-title" id="exampleModalCenterTitle">Join Session</h5>
							<button id='modal-close' type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.sendData}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body" style={{ marginBottom:'10px' }}>
							<form id="form">
								<div className="form-group" style={{ margin: '0' }}>
									<div className='col-sm-9 form-left'>
										<input autoComplete="off" type="text" className="form-control" id="project-link" name="link" value={this.state.value} onChange={this.handleChange.bind(this)} ></input>
									</div>
									<div className='col-sm-3 form-right'>
										<button type="button" className="button" onClick={ this.joinSession.bind(this) } >Join</button>
									</div>
								</div>
							</form>
						</div>

					</div>
				</div>
			</div>
			</div>
      )
  }
}
