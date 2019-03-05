import React, { Component } from 'react';
import {SingleUser} from './SingleUser';

export class UsersList extends Component {
  render() {
    return this.props.users.map((user) => (
      <SingleUser key={user.id} user={user} removeUser={this.props.removeUser}/>
    ));
  }
}

export default UsersList
