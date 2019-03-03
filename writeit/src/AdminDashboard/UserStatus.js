import React, { Component } from 'react';
import UserItem from './UserItem'

class UserStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    id: 1,
                    name: "Amy",
                    pic: null,
                    status:"Active"
                },
                {
                    id: 2,
                    name: "John",
                    pic: null,
                    status:"Active"
                },
                {
                    id: 3,
                    name: "Mike",
                    pic: null,
                    status:"Suspended"
                }
            ]
        }
    }

    render() {
        return this.state.users.map((user) => (
            <UserItem key={user.id} user={user}/>
        ));
    };
}

export default UserStatus;