import React, { Component } from 'react';
import placeholderimage from '../placeholder.png';


export class SingleUser extends Component {
  render() {
    const id = this.props.user.id;
    return (
        <div className="item">
            <div className="right floated content">
                <button className="ui small red button" onClick={this.props.removeUser.bind(this,id)}>Remove</button>
            </div>
            <img className="ui avatar image" src={placeholderimage} alt="logo" />
            <div className="content">
                <div className="header">{this.props.user.name}</div>
            </div>
        </div>
    )
  }
}

export default SingleUser
