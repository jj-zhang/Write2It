import React, { Component } from 'react';

export class UserItem extends Component {
  render() {
    return (
        <div className="item">
            <div className="right floated content">
                <div className="ui small blue button">Edit</div>
            </div>
            {/* <img className="ui avatar image" src="../../public/assets/images/stevie.jpg"> */}
            <div className="content">
                <div className="header"> {this.props.user.name}</div>
                {this.props.user.status}
            </div>
        </div>
    )
  }
}

export default UserItem
