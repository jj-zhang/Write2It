import React, { Component } from 'react';
import placeholderimage from '../placeholder.png';
import {Link} from 'react-router-dom';


export class UserItem extends Component {
  render() {
    return (
        <div className="item">
            <div className="right floated content">
                <div className="ui small blue button">Edit</div>
            </div>
            <img className="ui avatar image" src={placeholderimage} alt="logo" />
            <div className="content">

                <Link to={`/profile/${this.props.user.name}`} className="header">{this.props.user.name}</Link>

                {/* <span>{this.props.user.status}</span> */}
            </div>
        </div>
    )
  }
}

export default UserItem
