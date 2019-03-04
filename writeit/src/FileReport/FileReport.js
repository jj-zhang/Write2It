import React from 'react';
import './FileReport.css';

class Auth extends React.Component {
    constructor(props) {
        // takes 2 props user & sentence, both as string and a hide() function
        super(props);
    }

    // this function close the login box using the function passed in from parent Header
    onclick = (e)=> {
        const loginbox=document.querySelector('#loginform');
        if (!loginbox.contains(e.target)){
            this.props.hide();
        }
    }

    // this function handles the submit which is the login request
    submit = (e) => {
        e.preventDefault();
        // get the logininfo from the form
        const reportinfo=e.target.querySelector("#reason").value;
        const reportedID = this.props.id;
        const reportedUser = this.props.user;
        console.log(reportinfo+reportedUser+reportedID);
        // API CALL 
        // close the popup
        this.props.hide();
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
                            <div className="col-lg-6 col-xs-12">
                                <form id="loginform" className="ui form" onSubmit={this.submit}>
                                    <div className="field">
                                        <label>Post</label>
                                        <div className="ui left icon input">
                                            {this.props.sentence}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>User</label>
                                        <div className="ui left icon input">
                                            {this.props.user}
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label>Reason for Reporting</label>
                                        <div className="ui left icon input">
                                            <textarea id="reason" rows="4" cols="50"></textarea>
                                        </div>
                                    </div>

                                    <button className="ui teal button" type="submit">REPORT</button>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
        )
    }


}


export default Auth;