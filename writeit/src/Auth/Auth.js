import React from 'react';
import './Auth.css';
import {authenticate} from '../db/users';
import {Link} from 'react-router-dom';


// component to render authentication box
class Auth extends React.Component {
    constructor(props) {
        super(props);
        // when error is true, error message will appear
        this.state = {
            error: false
        }
    }

    // this function close the login box using the function passed in from parent Header
    onclick = (e) => {
        const loginbox = document.querySelector('#loginform');
        if (!loginbox.contains(e.target)) {
            this.props.hide();
        }
    }

    // this function handles the submit which is the login request
    login = (e) => {
        e.preventDefault();
        // get the logininfo from the form
        const username = e.target.uname.value;
        const password = e.target.psw.value;
        // Fake API call, sending the password and user name to server
        const response = authenticate({username: username, password: password});

        if (response) {
            // reply should contains the following:
            // the hash should be generated on the serverside contains the login time& userid
            // when sending request to server for other actions the hash should be contained 
            // in the header part for server to verify if the login is still valid, if the user 
            // has the permission to access his private info .. etc.
            const reply_hash = "oqidhaoihfb13131341234";
            const reply_usertype = response.userType;
            const reply_username = response.username;
            localStorage.setItem("loginStatus", reply_usertype);
            localStorage.setItem("token", reply_hash);
            localStorage.setItem("username", reply_username);
            window.location.href="../";
        } else {
            this.setState({error: true});
        }
    }

    // add/remove onclick to the event listener
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
                        <div className="col-lg-6 col-xs-12">
                            <form id="loginform" className="ui form shadow-lg" onSubmit={this.login}>
                                <div className="field">
                                    <label>Username</label>
                                    <div className="ui left icon input">
                                        <input type="text" name="uname" placeholder="Username" required/>
                                        <i className="user icon"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Password</label>
                                    <div className="ui left icon input">
                                        <input type="password" name="psw" placeholder="Password" required/>
                                        <i className="lock icon"/>
                                    </div>
                                </div>
                                <button className="ui teal button" type="submit">Login</button>
                                <p className="signup">New to <span className="lovelo">WriteIt</span>? <Link to="/signup">Sign
                                    up!</Link></p>
                                {this.state.error &&
                                    <div className="ui negative message">
                                        <div className="header">
                                            Incorrect username or password.
                                        </div>
                                        <p>Please try again.</p>
                                    </div>
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