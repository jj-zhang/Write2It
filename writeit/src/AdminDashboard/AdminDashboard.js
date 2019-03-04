import React, { Component } from 'react'
import UserStatus from './UserStatus';
import Reports from './Reports';


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
                        <div className="item">
                                    <div className="right floated content">
                                        <div className="ui small red button">Remove</div>
                                    </div>
                                    <div className="content">
                                        <div className="header">Snickerdoodle</div>
                                    </div>
                        </div>
                    </div>
                </div>




                <div class="ui segment userReports">
                    <h2>New Reports</h2>
                    <div class="ui middle aligned divided list">
                    <Reports/>
                    </div>

                    <h2>Archived Reports</h2>
                    <div class="ui middle aligned divided list">
                    </div>
                </div>


            </div>
        );
    }
}

export default AdminDashboard;