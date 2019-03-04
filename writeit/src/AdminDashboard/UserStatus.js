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
                },
                {
                    id: 4,
                    name: "Henry",
                    pic: null,
                    status:"Suspended"
                },
                {
                    id: 5,
                    name: "Jerry",
                    pic: null,
                    status:"Active"
                },
                {
                    id: 6,
                    name: "Johnson",
                    pic: null,
                    status:"Suspended"
                },
                {
                    id: 7,
                    name: "Jack",
                    pic: null,
                    status:"Active"
                },
                {
                    id: 8,
                    name: "Hellen",
                    pic: null,
                    status:"Suspended"
                },
                {
                    id: 9,
                    name: "Smith",
                    pic: null,
                    status:"Active"
                },
                {
                    id: 10,
                    name: "Jane",
                    pic: null,
                    status:"Suspended"
                },
                {
                    id: 11,
                    name: "Joe",
                    pic: null,
                    status:"Active"
                },
                {
                    id: 12,
                    name: "Jimmy",
                    pic: null,
                    status:"Suspended"
                },
                {
                    id: 13,
                    name: "Oscar",
                    pic: null,
                    status:"Active"
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