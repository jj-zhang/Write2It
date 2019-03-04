import React, { Component } from 'react'
import UserStatus from './UserStatus';

class AdminDashboard extends Component {
    render() {
        return (
            <div className="container col-lg-6 col-xs-12">
                <div className="ui segment">
                    <div className="ui middle aligned divided list">
                    <UserStatus/>
                    </div>
                </div>
                <div className="ui segment">
                    <div className="userList ui middle aligned divided list">
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;