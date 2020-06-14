import React, { Component } from 'react';
import axios from 'axios';
import MembersList from './MembersList';

export default class Content extends Component{
    constructor(props) {
        super(props);
		this.state = {
            response: true,
			isLoading: false,
            error: false,
            showModal:false,
            session_live: '',
            isSession: false,
            member_list: [],
            isMember: false,
		}
      }
    verify(token) {
		if(token==''){ return false}
		else{ return true }
    }
    
    // Child to Parrent: Callback function
	  sendData = () => {
	    this.props.parentCallback("refresh");
    }
         
    delete = async (data) => {
		
		document.getElementById('dialog').style.animation = 'none';
        document.getElementById('dialog').style.opacity = '0';
        
        var type = data.title.split(':')[0]
        var name = data.title.split(':')[1]

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
        console.log(name)
		if (access){
			var apiURL = "http://localhost:3000/delete";
            this.setState({ isLoading: true});

            if(this.props.admin!=''){
                var admin = this.props.admin;
                apiURL = "http://localhost:3000/session/exit";
                console.log('Admin Name: ', admin)

                var req = {
                    username: cookie.username,
                    session_name: name,
                }
            }
            else if (type.toLowerCase()=='session') {
                var req = {
                    username: cookie.username,
                    email: cookie.email,
                    name: name,
                    isSession: true
                }
            }
            else{
                var req = {
                    username: cookie.username,
                    email: cookie.email,
                    name: name,
                    isSession: false
                }
            }

			const response = await axios.post(apiURL, req ,
			{
					headers: {
						'auth-token': token
					}
			})
			console.log('from api: ', response.data)

			this.setState({ 
                isLoading: false
            });
            this.sendData();
            document.getElementById('name').innerHTML = ''
            document.getElementById('code-editor').src = ''
            document.getElementById('btn-delete').style.opacity = '0';
            document.getElementsByClassName('dropdown')[0].style.opacity = '0';
            var admin_span = document.getElementById('admin-name')
            var member_dropdown = document.getElementsByClassName('dropdown1')[0]
            if(admin_span){
                admin_span.style.opacity = '0'
            }
            if(member_dropdown){
                member_dropdown.style.opacity = '0'
            }

            
			document.getElementById('dialog-msg').innerHTML = response.data;
			document.getElementById('dialog').style.animation = 'dialog 3s ease normal';
			document.getElementById('dialog').style.opacity = '1';
		}
		else { document.getElementById('logout').submit() }
    }


      // Child to Parrent: Callback function from child
    callbackFunction = (childData) => {
        this.props.parentCallback();
    }
    handleClick(create){
        this.setState({showModal:true});  
    }

	exists = async () =>{
        // setInterval( this.joinedSessionList, 3000 )
        if(this.props.admin!=''){
            setInterval( async () => { 

                var title = document.getElementById('name').innerText;
                var name = title.split(':')[1]
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
                    const apiURL = "http://localhost:3000/exists";
                    const response = await axios.post(apiURL, {
                            username: cookie.username,
                            session_name: name
                    },
                    {
                            headers: {
                                'auth-token': token
                            }
                    });

                    if(response.data==false){
                        this.setState({ isLoading: true});
                        document.getElementById('name').innerHTML = ''
                        document.getElementById('code-editor').src = ''
                        document.getElementById('btn-delete').style.opacity = '0';
                        document.getElementsByClassName('dropdown')[0].style.opacity = '0';
                        var admin_span = document.getElementById('admin-name')
                        var member_dropdown = document.getElementsByClassName('dropdown1')[0];
                        if(admin_span){
                            admin_span.style.opacity = '0'
                        }
                        if(member_dropdown){
                            member_dropdown.style.opacity = '0'
                        }
                        this.setState({ isLoading: false });
                    }
                }
                else { document.getElementById('logout').submit() }

            }, 3000 )
        }
	}

    componentDidUpdate(prevProps, prevState){
        this.exists()
        if ( prevState.isMember!== true){
            var myElem = document.getElementById('dropdownMenuMembers')
                if(myElem){
                    document.getElementById('dropdownMenuMembers').addEventListener('click',  this.memberList.bind()) 
                    
                }
        }
    }


    callbackFunction = () => {
        this.memberList.bind();
      }

    memberList = async () => {
        var title = document.getElementById('name').innerText;
        var name = title.split(':')[1]
                
        // console.log('getting list for ', name)
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
            const apiURL = "http://localhost:3000/member/list";
            try{
                    const response = await axios.post(apiURL, {
                            admin: cookie.username,
                            session_name: name,
                    },
                    {
                            headers: {
                                'auth-token': token
                            }
                    })
                    var i = 0; const list =[]
                    for(i=0; i<Object.values(response.data).length; i++){
                        list.push(Object.values(response.data)[i].username)
                    }
                    
                    
                    this.setState({ 
                        member_list: list,
                        isMember: true
                    });
                    // if(this.state.member_list.length!=0){ this.setState({
                    //     response: true,
                    //     error: false
                    // }); }
                } catch (err) {
                    // handle exception
                    console.log('Could not connect to server :/') 
                    
                }
            }
        
        else { document.getElementById('logout').submit() }
        
    }
    
    
    render() {
        var link;
        if(this.props.link.includes('session')){
            var title = 'Session:'+this.props.link.slice(this.props.link.split('/', 2).join('/').length+1, this.props.link.length)
            var name = title.split(':')[1]
            var id = this.props.id
            var admin = this.props.admin
            link = 'http://localhost:5000/?id=private-'+id
        }else{ 
            var title = 'Project:'+this.props.link.slice(this.props.link.split('/', 2).join('/').length+1, this.props.link.length)
            var name = title.split(':')[1]
            link = 'http://localhost:5000/?id='+name
        }
    
        let elem;   
        if(this.props.link) {
            elem = 	<iframe id="code-editor" src={link}></iframe>
            {document.getElementById('btn-delete').style.opacity = '1';
            document.getElementById('create-session').style.opacity = '1';
            document.getElementById('content').style.opacity = '1';
            document.getElementsByClassName('dropdown')[0].style.opacity = '1';
            var admin_span = document.getElementById('admin-name')
            var member_dropdown = document.getElementsByClassName('dropdown1')[0]
            if(admin_span){
                admin_span.style.opacity = '1'
            }
            if(member_dropdown){
                member_dropdown.style.opacity = '1'
            }}
            
        }else{
            name = ''
        }


        const response = this.state.response;
		let members;
		if(response) {
			members = 	this.state.member_list.map((value, key) => {
                    return <MembersList parentCallback={this.callbackFunction} value={value} name={name} />
            });
        } else {
			members = <span id='error'>No Members found!</span>
        }
        
        return (

            <div id="content" ref="contentComp">
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
                <div className="col-sm-12 content-top">
                    <span id='name'>{title}</span>

                    {this.props.admin && <span style={{ marginLeft: '20px' }} id='admin-name'>Admin: {admin}</span>}
                    {/* <button onClick={this.delete.bind(this, {name, link})} id="btn-delete" className='button disabled' style={{opacity:'0'}}>
                        Delete
                        <svg className="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                        </svg>
                    </button>*/}
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg className="bi bi-list bi-icon" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
                                <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </button>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={this.delete.bind(this, {title})} id="btn-delete">
                                Delete
                                <svg style={{ color: '#e14a31' }} className="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    { this.props.link.includes('session') &&  
                    <div className="dropdown1" id='member-dropdown-list'>
                        
                            
                            <button className="btn btn-secondary dropdown-toggle member-list" type="button" id="dropdownMenuMembers" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg className="bi bi-people bi-icon" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zm7.973.056v-.002.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                </svg>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuMembers">

                            {this.state.isMemberLoading && <div className="loader">Loading...</div>}
                            {members}
                            </div>
                        </div>}


                </div>
                <div className="col-sm-12 content-bottom">
                    {this.state.isLoading && <div className="loader">Loading...</div>}
                    <div className="workspace">
                        {elem}
                     </div>
                </div>
            </div>
      );

    }

}


