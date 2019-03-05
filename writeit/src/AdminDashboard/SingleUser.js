import React, { Component } from 'react';
import placeholderimage from '../placeholder.png';
import {Link} from 'react-router-dom';


export class SingleUser extends Component {
    constructor(props) {
        super(props);

        this.state = {user: props.user};
    }

    // toggle whether a user is suspended or not
    toggleSuspend() {
        const user = this.state.user;
        user.userType = user.userType === 'admin' ? 'user' : 'admin';

        this.setState({user: user});
    }


    render() {
        return (
            <div className="item">
                <div className="right floated content">

                    {this.state.user.userType === 'admin' ?
                        <div className="ui small red button userOption" onClick={this.toggleSuspend.bind(this)}>Remove</div>
                        :
                        <div className="ui small blue button userOption" onClick={this.toggleSuspend.bind(this)}>Add</div>
                    }

                </div>
                <img className="ui avatar image" src={placeholderimage} alt="logo"/>
                <div className="content">

                    <Link to={`/profile/${this.state.user.name}`} className="user header">{this.state.user.name}</Link>

                    <p>{this.state.user.userType === 'admin' ? 'Admin' : 'Player'}</p>
                </div>
            </div>
        )
    }
}

export default SingleUser
