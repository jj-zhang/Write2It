import React from 'react';
import './Signup.css';
import placeholderimage from '../placeholder.png';
import {signup} from '../db/users';
import {onlogin} from '../Session/AuthSession'
// the Sign up page
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconImageUrl: placeholderimage,
            imagefile: null,
            error: false,
            errormessage: null,
        }
    }
    
    // update the image preview on image change
    updateImage = e => {
        e.preventDefault();
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
    signup = (e) => {
        e.preventDefault();
        //console.log("signup triggered")
        // get the logininfo from the form
        const username = e.target.uname.value;
        const password = e.target.psw.value;
        const email = e.target.email.value;
        const icon = this.state.imagefile;
        // validate if the password is valid(4chars or longer)
        if(password.length < 4){
            this.setState({error: true, errormessage: "password must be at least 4 characters long"})
            return;
        }
        const data = {name:username, password:password, email:email};
        const request = new Request("/signup", {
            method: 'post', 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
        .then(
            (res)=>{
                if (res.status != 200){
                    alert("woops! error code:"+res.status);
                }else{
                    return res.json()
                }
            }
        )
        .then(
            (res)=>{
                //console.log(res);
                if (res.error){
                    this.setState({error: true, errormessage: res.message});
                }
                else{
                    onlogin(res.user.role, res.user.name, res.user._id);
                }
            }
        )
    }

    render() {
        return (
                <div id="signup">
                    <form className="ui form shadow-lg" onSubmit={this.signup}>
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
                                    <input type="password" name="psw" placeholder="Password" required/>
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <button className="ui teal button" type="submit">Sign Up</button>
                            {   this.state.error &&
                            <div className="ui negative message">
                                <div className="header">
                                    {this.state.errormessage}
                                </div>
                                <p>Please try again.</p>
                            </div>
                            }
                        </div>
                    </form>
                </div>
                )
    }


}


export default SignUp;