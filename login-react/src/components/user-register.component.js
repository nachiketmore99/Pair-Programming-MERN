import React, { Component } from 'react';

export default class UserRegister extends Component {


    render() {
        return (

            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                        <form className="login100-form validate-form flex-sb flex-w" action="https://api-pair-programming.herokuapp.com/user/register" method="POST">
                            <span className="login100-form-title p-b-32">
                                Account Register
                            </span>

                            <span className="txt1 p-b-11">
                                Username
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                                <input className="input100" type="text" name="username" ></input>
                                <span className="focus-input100"></span>
                            </div>

                            <span className="txt1 p-b-11">
                                Email
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate = "Email is required">
                                <input className="input100" type="text" name="email" ></input>
                                <span className="focus-input100"></span>
                            </div>
                            
                            <span className="txt1 p-b-11">
                                Password
                            </span>
                            <div className="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
                                <input className="input100" type="text" name="password" ></input>
                                <span className="focus-input100"></span>
                            </div>
                            


                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Register
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        )
    }
}