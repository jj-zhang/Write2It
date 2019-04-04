import React from 'react';
import './FileReport.css';

class FileReport extends React.Component {
    // takes 2 props user & sentence, both as string and a hide() function

    // this function close the login box using the function passed in from parent Header
    onclick = (e)=> {
        const form=document.querySelector('#reportform');
        if (!form.contains(e.target)){
            this.props.hide();
        }
    }

    // this function handles the submit which is the report request
    submit = (e) => {
        e.preventDefault();
        // // get the logininfo from the form commented out for avoid warning
        const reportinfo=e.target.querySelector("#reason").value;
        e.preventDefault();
        const request = new Request("/message", {
            method: 'post', 
            body: JSON.stringify({message:reportinfo}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then(
            (res)=>{
                if (res.status !== 200){
                    alert("woops! error code:"+res.status);
                }else{
                    alert("report has been sent");
                }
            }
        )
        // close the popup
        this.props.hide();
    }

    componentDidMount() {
        document.querySelector("#filereport").addEventListener('click', this.onclick);
    }

    componentWillUnmount() {
        document.querySelector("#filereport").removeEventListener('click', this.onclick);

    }

    render() {
        return (
                <div id="filereport">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-xs-12">
                                <form id="reportform" className="shadow-lg ui form" onSubmit={this.submit}>
                                    <div className="field">
                                        <label>Sentence</label>
                                        <div className="ui left icon input">
                                            {this.props.sentence}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Username</label>
                                        <div className="ui left icon input">
                                            {this.props.user}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Message</label>
                                        <div className="ui left icon input">
                                            <textarea id="reason" rows="5" cols="50"></textarea>
                                        </div>
                                    </div>
                                    <button className="ui teal button" type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }


}


export default FileReport;