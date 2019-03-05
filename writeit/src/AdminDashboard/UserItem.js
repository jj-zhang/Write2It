import React, {Component} from 'react';
import placeholderimage from '../placeholder.png';
import {Link} from 'react-router-dom';


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

                    {this.state.user.suspended ?
                        <div className="ui small green button" onClick={this.toggleSuspend.bind(this)}>Unsuspend</div>
                        :
                        <div className="ui small red button" onClick={this.toggleSuspend.bind(this)}>Suspend</div>
                    }

                </div>
                <img className="ui avatar image" src={placeholderimage} alt="logo"/>
                <div className="content">

                    <Link to={`/profile/${this.state.user.name}`} className="header">{this.state.user.name}</Link>

                    <p>{this.state.user.suspended ? <span className="suspended">Suspended</span> : 'Active'}</p>
                </div>
            </div>
        )
    }
}

export default UserItem
