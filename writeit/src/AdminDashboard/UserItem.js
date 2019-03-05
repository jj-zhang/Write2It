import React, {Component} from 'react';
import placeholderimage from '../placeholder.png';
import {Link} from 'react-router-dom';

// React component to render the individual user.
export class UserItem extends Component {
    constructor(props) {
        super(props);

        const user = {name: this.props.user.name, suspended: false};

        this.state = {user: user};
    }

    // toggle whether a user is suspended or not
    toggleSuspend() {
        const user = this.state.user;
        user.suspended = !user.suspended;

        this.setState({user: user});
    }


    render() {
        return (
            <div className="item">
                <div className="right floated content">
                {/* Switch unsuspend and suspend status. */}
                    {this.state.user.suspended ?
                        <div className="ui small blue button userOption" onClick={this.toggleSuspend.bind(this)}>Unsuspend</div>
                        :
                        <div className="ui small red button userOption" onClick={this.toggleSuspend.bind(this)}>Suspend</div>
                    }

                </div>
                <img className="ui avatar image" src={placeholderimage} alt="logo"/>
                <div className="content">

                    <Link to={`/profile/${this.state.user.name}`} className="user header">{this.state.user.name}</Link>

                    <p>{this.state.user.suspended ? <span className="suspended">Suspended</span> : 'Active'}</p>
                </div>
            </div>
        )
    }
}

export default UserItem
