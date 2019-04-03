'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// React component to render the individual user.
export class UserItem extends Component {
    render() {
        return (
            <div className="item">
                <div className="right floated content">
                {/* Switch unsuspend and suspend status. */}
                    {this.props.user.status === "suspended" ?
                        <div className="ui small blue button userOption" onClick={this.props.updateStatus.bind(this, this.props.user._id, 'active')}>Unsuspend</div>
                        :
                        <div className="ui small red button userOption" onClick={this.props.updateStatus.bind(this, this.props.user._id, 'suspended')}>Suspend</div>
                    }

                </div>
                <img className="ui avatar image" src={ this.props.user.profilePic ? this.props.user.profilePic : "/assets/images/placeholder.png"} alt="logo"/>
                <div className="content">

                    <Link to={`/profile/${this.props.user.name}`} className="user header">{this.props.user.name}</Link>

                    <p>{this.props.user.status === "suspended" ? <span className="suspended">Suspended</span> : 'Active'}</p>
                </div>
            </div>
        )
    }
}

export default UserItem
