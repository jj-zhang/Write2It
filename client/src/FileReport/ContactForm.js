import React from 'react';
import './FileReport.css';

class ContactForm extends React.Component {
    // props accept a hide function from parent
    
    // this function close the login box using the function passed in from parent Header
    onclick = (e)=> {
        const form=document.querySelector('#contactform');
        if (!form.contains(e.target)){
            this.props.hide();
        }
    }

    // this function handles the submit which is the report request
    submit = (e) => {
        e.preventDefault();
        //// get the logininfo from the form lines below are commented out for avoid warnings
        // const userhash = localStorage.getItem("token");
        // const reportinfo=e.target.querySelector("#contactmessage").value;
        // FAKE API CALL

        // close the popup
        this.props.hide();
    }

    //
    componentDidMount() {
        document.querySelector("#adminreport").addEventListener('click', this.onclick);
    }

    componentWillUnmount() {
        document.querySelector("#adminreport").removeEventListener('click', this.onclick);

    }

    render() {
        return (
            <div id="adminreport">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-xs-12">
                            <form id="contactform" className="shadow-lg ui form" onSubmit={this.submit}>
                                <div className="field">
                                    <label>Message to admins</label>
                                    <div className="ui left icon input">
                                        <textarea id="contactmessage" rows="10" cols="60"></textarea>
                                    </div>
                                </div>
                                <p>You may also email us through <strong>admin@writeit.ca</strong></p>

                                <button className="ui teal button" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ContactForm;