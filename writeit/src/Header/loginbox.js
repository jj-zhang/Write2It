import React from 'react';

class LoginBox extends React.Component{

    render(){
        return(
        this.props.show?
        <div id="loginbox-container">
            <div id="loginbox">
                <form class="loginbox-container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required/>
                        
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        :null
        )
    }



}


export default LoginBox;