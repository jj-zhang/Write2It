import React from 'react';
import './Signup.css';
import placeholderimage from './placeholder.png';
import {signup} from '../db/users';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconImageUrl: placeholderimage,
            imagefile: null,
            error: false,
            errormessage: null

        }
    }

    updateImage = e => {
        e.preventDefault();
        console.log("called");
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            this.setState({
                imagefile: file,
                iconImageUrl: reader.result
            });
        }
    }

    // this function handles the submit which is the signup request
    signup = e => {
        e.preventDefault();
        // get the logininfo from the form
        const username = e.target.uname.value;
        const password = e.target.psw.value;
        const email = e.target.email.value;
        const icon = this.state.imagefile;
        console.log(username + password + email);


        // Fake API call to signup a new user
        const response = signup({username: username, password: password, email: email, profilePhoto: icon});
        if (response) {
            // if signup success, the client side should immediately switch status to logged in status
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
            window.location.href = "../";
        } else {
            // otherwise the reply should contains some errormessage
            const errormessage = "Username already in use, please try another one";
            this.setState({error: true, errormessage: errormessage});
        }
    }

    render() {
        return (
            <div id="signup">
                <form className="ui form" onSubmit={this.signup}>
                    <div className="profileIconContainer field">
                        <img id="iconImage" alt="User Icon Preview" src={this.state.iconImageUrl}></img>
                    </div>
                    <div className="profileInputContainer">
                        <div className="field">
                            <label>Username</label>
                            <div className="ui left icon input">
                                <input type="text" name="uname" placeholder="Username" required/>
                                <i className="user icon"></i>
                            </div>
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <div className="ui left icon input">
                                <input type="text" name="email" placeholder="XXXX@gmail.com" required/>
                                <i className="envelope icon"></i>
                            </div>
                        </div>
                        <div className="field">
                            <label>Profile Icon</label>
                            <div className="ui left icon input">
                                <input type="file" name="icon" accept="image/*" onChange={this.updateImage}/>
                                <i className="arrow circle up icon"></i>
                            </div>
                        </div>

                        <div className="field">
                            <label>Password</label>
                            <div className="ui left icon input">
                                <input type="password" name="psw" placeholder="Username" required/>
                                <i className="lock icon"></i>
                            </div>
                        </div>
                        <button className="ui teal button" type="submit">Sign Up</button>
                        {   this.state.error ?
                            <div className="ui negative message">
                                <div className="header">
                                    {this.state.errormessage}
                                </div>
                                <p>Please try again.</p>
                            </div>
                            : null
                        }
                    </div>
                </form>
            </div>
        )
    }


}


export default SignUp;