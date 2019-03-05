import React, { Component } from 'react';
import placeholderimage from '../placeholder.png';
import {Link} from 'react-router-dom';


export class SingleUser extends Component {
  
  render() {
    const id = this.props.user.id;
    return (
        <div className="item">
            <div className="right floated content">
               {this.props.user.name === "admin" ?
                <button className="ui small red button" onClick={this.props.removeUser.bind(this,id)}>Remove</button>
                : <button className="ui small blue button" onClick={this.props.removeUser.bind(this,id)}>Add</button>
               }
            </div>
            <img className="ui avatar image" src={placeholderimage} alt="logo" />
            <div className="content">
                <Link to={`/profile/${this.props.user.name}`} className="header">{this.props.user.name}</Link>
            </div>
        </div>
    )
  }
}

export default SingleUser
