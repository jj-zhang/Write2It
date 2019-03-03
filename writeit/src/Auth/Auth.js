import React from 'react';
import './Auth.css';
import {authenticate} from '../db/users';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            error:false
        }
    }

    // this function close the login box using the function passed in from parent Header
    onclick = (e)=> {
        const loginbox=document.querySelector('#loginform');
        if (!loginbox.contains(e.target)){
            this.props.hide();
        }
    }

    // this function handles the submit which is the login request
    login = (e) => {
        e.preventDefault();
        // get the logininfo from the form
        const username=e.target.uname.value;
        const password=e.target.psw.value;
        console.log(username+password);


        // API CALL, Sending the password and user name to server 
        const loginSuccess = authenticate({username: username, password: password});

        if (loginSuccess) {
            // reply should contains the following:
            // the hash should be generated on the serverside contains the login time& userid
            // when sending request to server for other actions the hash should be contained 
            // in the header part for server to verify if the login is still valid, if the user 
            // has the permission to access his private info .. etc.
            const reply_hash = "oqidhaoihfb13131341234";
            const reply_usertype = username;
            const reply_username = username;
            localStorage.setItem("loginStatus", reply_usertype);
            localStorage.setItem("token", reply_hash);
            localStorage.setItem("username", reply_username);
            window.location.href="../";    
        } else {
            this.setState({error: true});
        }
    }

    componentDidMount() {
        document.querySelector("#auth").addEventListener('click', this.onclick);
    }

    componentWillUnmount() {
        document.querySelector("#auth").removeEventListener('click', this.onclick);

    }

    render() {
        return (
                <div id="auth">
                    <div className="container">
                        <div className="row">
                            <div className="offset-lg-3 col-lg-6 col-xs-12">
                                <form id="loginform" className="ui form" onSubmit={this.login}>
                                    <div className="field">
                                        <label>Username</label>
                                        <div className="ui left icon input">
                                            <input type="text" name="uname" placeholder="Username" required/>
                                            <i className="user icon"></i>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label>Password</label>
                                        <div className="ui left icon input">
                                            <input type="password" name="psw" placeholder="Password" required/>
                                            <i className="lock icon"></i>
                                        </div>
                                    </div>

                                    <button className="ui teal button" type="submit">Login</button>

                                    <p>New to <span className="lovelo">WriteIt</span>? <a href="/signup">Sign up!</a></p>


                                    {   this.state.error ?
                                        <div className="ui negative message">
                                            <div className="header">
                                                Incorrect username or password.
                                            </div>
                                            <p>Please try again.</p>
                                        </div>
                                        :null
                                    }

                                </form>


                            </div>
                        </div>
                    </div>
                </div>
        )
    }


}


export default Auth;