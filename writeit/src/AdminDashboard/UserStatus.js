import React, { Component } from 'react';
import UserItem from './UserItem'

class UserStatus extends Component {
    render() {
        return this.props.users.map((user) => (
            <UserItem key={user.id} user={user}/>
        ));
    };
}

export default UserStatus;