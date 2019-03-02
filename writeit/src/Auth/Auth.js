import React from 'react';
import './Auth.css';


class LoginBox extends React.Component {

    render() {
        return (
            this.props.show ?
                <div id="auth">
                    <div className="container">
                        <div className="row">
                            <div className="offset-lg-3 col-lg-6 col-xs-12">
                                <form className="ui form">
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
                                            <input type="text" name="psw" placeholder="Username" required/>
                                            <i className="lock icon"></i>
                                        </div>
                                    </div>

                                    {/*<label for="uname"><b>Username</b></label>*/}
                                    {/*<input type="text" placeholder="Enter Username" name="uname" required/>*/}

                                    {/*<label for="psw"><b>Password</b></label>*/}
                                    {/*<input type="password" placeholder="Enter Password" name="psw" required/>*/}
                                    {/**/}

                                    <button className="ui teal button" type="submit">Login</button>

                                    {/*<button type="submit">Login</button>*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                : null
        )
    }


}


export default LoginBox;