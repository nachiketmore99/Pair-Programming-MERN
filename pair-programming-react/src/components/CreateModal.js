import React, { useState, Component }  from 'react';
import axios from 'axios';

export default class CreateModal extends Component {
	constructor(){
		super();
		this.state = {
		  showModal:'',
		  isLoading: false,
		  value: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this); 
	  }
	  handleChange(event) {
		this.setState({value: event.target.value});
	  }
	
	// Child to Parrent: Callback function
	  sendData = () => {
		this.props.parentCallback("refresh");
   	  }
	
	  handleSubmit = async () => {
		document.getElementById('error-dialog').style.animation = 'none';
		document.getElementById('error-dialog').style.opacity = '0';
		
		document.getElementById('dialog').style.animation = 'none';
		document.getElementById('dialog').style.opacity = '0';
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
		const form_type= (this.props.create).toLowerCase();
		console.log(form_type)
		if(form_type=='session'){
			var req = {
				session_name: this.state.value,
				username: cookie.username,
				email: cookie.email
			}
		}else{
			var req = {
				project_name: this.state.value,
				username: cookie.username,
				email: cookie.email
			}
		}
		
		const apiURL = "http://localhost:3000/"+form_type+"/create";
		console.log('value submitted: ',this.state.value)
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
        <div className="modal fade" id="Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalCenterTitle">Create New {this.props.create}</h5>
							<button id='modal-close' type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.sendData}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form id="form">
								<div className="form-group">
									<label htmlFor="recipient-name" className="col-form-label">{this.props.create} Name:</label>
									<input autoComplete="off" type="text" className="form-control" id="project-name" name="project-name" value={this.state.value} onChange={this.handleChange} ></input>
								</div>
								<div className="modal-footer">
									<button type="button" className="button" onClick={ this.handleSubmit } >Create</button>
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
