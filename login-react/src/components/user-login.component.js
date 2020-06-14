import React, { Component } from 'react';

export default class UserLogin extends Component {
    
    render() {
        
        return (

            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                        <form className="login100-form validate-form flex-sb flex-w" action="https://api-pair-programming.herokuapp.com/user/login" method="POST">
                            <span className="login100-form-title p-b-32">
                                Account Login
                            </span>

                            <span className="txt1 p-b-11">
                                Username
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                                <input className="input100" type="text" name="username" ></input>
                                <span className="focus-input100"></span>
                            </div>
                            
                            <span className="txt1 p-b-11">
                                Password
                            </span>
                            <div className="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
                                <span className="btn-show-pass" id='eye'>
                                    <i className="fa fa-eye"></i>
                                </span>
                                <input className="input100" type="password" name="password" ></input>
                                <span className="focus-input100"></span>
                            </div>
                            


                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Login
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        )
    }
}