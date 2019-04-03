'use strict';


import React, { Component } from 'react';
// import placeholderimage from '../../public/assets/images/placeholder.png';
import {Link} from 'react-router-dom';

// React component to render the single user.
export class SingleUser extends Component {
    render() {
        return (
            <div className="item">
                <div className="right floated content">
                    {/* Switch unsuspend and suspend status. */}

                    {this.props.user.role === 'admin' ?
                        <button className="ui small red button userOption" onClick={this.props.updateRole.bind(this, this.props.user._id, 'user')}>Remove</button>
                        :
                        <button className="ui small blue button userOption" onClick={this.props.updateRole.bind(this, this.props.user._id, 'admin')}>Add</button>
                    }

                </div>
                <img className="ui avatar image" src={"/assets/images/placeholder.png"} alt="logo"/>
                <div className="content">
                    <Link to={`/profile/${this.props.user.name}`} className="user header">{this.props.user.name}</Link>
                    <p>{this.props.user.role === 'admin' ? 'Admin' : 'Player'}</p>
                </div>
            </div>
        )
    }
}

export default SingleUser;
