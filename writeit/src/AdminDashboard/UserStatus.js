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
                    status:"Active",
                    src: process.env.PUBLIC_URL + '/assets/images/boy-1.svg'
                },
                {
                    id: 2,
                    name: "John",
                    pic: null,
                    status:"Active",
                    src: process.env.PUBLIC_URL + '/assets/images/boy-2.svg'
                },
                {
                    id: 3,
                    name: "Mike",
                    pic: null,
                    status:"Suspended",
                    src: process.env.PUBLIC_URL + '/assets/images/girl-1.svg'
                },
                {
                    id: 4,
                    name: "Henry",
                    pic: null,
                    status:"Suspended",
                    src: process.env.PUBLIC_URL + '/assets/images/girl-2.svg'
                },
                {
                    id: 5,
                    name: "Jerry",
                    pic: null,
                    status:"Active",
                    src: process.env.PUBLIC_URL + '/assets/images/girl-3.svg'
                },
                {
                    id: 6,
                    name: "Johnson",
                    pic: null,
                    status:"Suspended",
                    src: process.env.PUBLIC_URL + '/assets/images/boy-3.svg'
                },
                {
                    id: 7,
                    name: "Jack",
                    pic: null,
                    status:"Active",
                    src: process.env.PUBLIC_URL + '/assets/images/boy-4.svg'
                },
                {
                    id: 8,
                    name: "Hellen",
                    pic: null,
                    status:"Suspended",
                    src: process.env.PUBLIC_URL + '/assets/images/girl-5.svg'
                },
                {
                    id: 9,
                    name: "Smith",
                    pic: null,
                    status:"Active",
                    src: process.env.PUBLIC_URL + '/assets/images/boy-5.svg'
                },
                {
                    id: 10,
                    name: "Jane",
                    pic: null,
                    status:"Suspended",
                    src: process.env.PUBLIC_URL + '/assets/images/girl-6.svg'
                },
                {
                    id: 11,
                    name: "Joe",
                    pic: null,
                    status:"Active",
                    src: process.env.PUBLIC_URL + '/assets/images/girl-7.svg'
                },
                {
                    id: 12,
                    name: "Jimmy",
                    pic: null,
                    status:"Suspended",
                    src: process.env.PUBLIC_URL + '/assets/images/boy-5.svg'
                },
                {
                    id: 13,
                    name: "Oscar",
                    pic: null,
                    status:"Active",
                    src: process.env.PUBLIC_URL + '/assets/images/boy-6.svg'
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