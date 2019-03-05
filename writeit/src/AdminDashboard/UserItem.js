import React, { Component } from 'react';
// import pic1 from './boy-1.svg';

export class UserItem extends Component {
  render() {
    return (
        <div className="item">
            <div className="right floated content">
                <div className="ui small blue button">Edit</div>
            </div>
            <img className="ui avatar image" src={this.props.user.src} alt="logo" />
            <div className="content">
                <div className="header"> {this.props.user.name}</div>
                {/* <span>{this.props.user.status}</span> */}
            </div>
        </div>
    )
  }
}

export default UserItem
