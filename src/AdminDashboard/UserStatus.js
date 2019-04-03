'use strict';

import React, { Component } from 'react';
import UserItem from './UserItem';

// React component to render the each user's status
class UserStatus extends Component {
    render() {
        return this.props.users.map((user) => (
            <UserItem key={user._id} user={user} updateStatus={this.props.updateStatus}/>
        ));
    };
}

export default UserStatus;