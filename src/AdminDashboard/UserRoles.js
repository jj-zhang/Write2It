import React, { Component } from 'react';
import {SingleUser} from './SingleUser';

// React component to render the list of user roles.
export class UserRoles extends Component {
  render() {
    return this.props.users.map((user) => (
      <SingleUser key={user.id} user={user} removeUser={this.props.removeUser}/>
    ));
  }
}

export default UserRoles
