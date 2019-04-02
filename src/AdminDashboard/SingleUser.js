'use strict';


import React, { Component } from 'react';
// import placeholderimage from '../../public/assets/images/placeholder.png';
import {Link} from 'react-router-dom';

// React component to render the single user.
export class SingleUser extends Component {
    constructor(props) {
        super(props);

        this.state = {user: props.user};
    }

    // Fake API call to set users as admins or regular players
    toggleSuspend() {
        const user = this.state.user;
        user.userType = user.userType === 'admin' ? 'user' : 'admin';

        this.setState({user: user});
    }


    render() {
        return (
            <div className="item">
                <div className="right floated content">
                    {/* Switch unsuspend and suspend status. */}    
                    {this.state.user.userType === 'admin' ?
                        <div className="ui small red button userOption" onClick={this.toggleSuspend.bind(this)}>Remove</div>
                        :
                        <div className="ui small blue button userOption" onClick={this.toggleSuspend.bind(this)}>Add</div>
                    }

                </div>
                <img className="ui avatar image" src={"/assets/images/placeholder.png"} alt="logo"/>
                <div className="content">
                    <Link to={`/profile/${this.state.user.name}`} className="user header">{this.state.user.name}</Link>
                    <p>{this.state.user.userType === 'admin' ? 'Admin' : 'Player'}</p>
                </div>
            </div>
        )
    }
}

export default SingleUser
