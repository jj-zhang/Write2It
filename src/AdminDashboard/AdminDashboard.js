'use strict';

import React, {Component} from 'react';
import UserStatus from './UserStatus';
import Reports from './Reports';
import ArchivedReports from './ArchivedReports';
import UserRoles from './UserRoles';
import './AdminDashboard.css';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        // Hardcode data that records different reports.
        this.state = {
            displayView: null,
            reports: [],
            archivedReports: [],
            users: []
        };

        // Bind the function archiveList with the constructor.
        this.archiveList = this.archiveList.bind(this);
    }

    componentDidMount() {
        this.setDisplayView('userReports');
    };

    // The function to archive the report list and add it to the archive report list.
    archiveList = (id) => {
        var getReport = this.state.reports.find(obj => {
            return obj.id === id;
        });
        this.setState(prevState => ({
            reports: prevState.reports.filter(el => el.id !== id),
            archivedReports: [...prevState.archivedReports, getReport]
        }));
    };

    // React component to render the admin dashboard view
    removeUser = (id) => {
        this.setState(prevState => ({
            users: prevState.users.filter(el => el.id !== id),
        }));
    };

    getById = (idToSearch) => {
        return this.state.reports.filter(report => report.id === idToSearch);
    };


    // display view (user reports, user status, user roles)
    setDisplayView(viewName) {
        this.setState({displayView: viewName});


        if (this.state.displayView == 'userReports') {
            fetch('/message?solved=false')
                .then((result) => {
                    if (result.status === 200) {
                        return result.json();
                    } else {
                        return Promise.reject("Could not find reports.");
                    }
                })
                .then((json) => {
                    this.setState({
                        reports: this.state.reports.concat(json.docs)
                    });
                    return fetch('/message?solve=true');

                }).then((result) => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    return Promise.reject("Could not find reports.");
                }
            }).then((json) => {
                this.setState({
                    archivedReports: json.docs
                });
            }).catch((error) => {
                console.log(error);
            });

        } else {
            fetch('/user')
                .then((result) => {
                    if (result.status === 200) {
                        return result.json();
                    } else {
                        return Promise.reject("Could not find users.");
                    }
                })
                .then((json) => {
                    this.setState({
                        users: json
                    });
                }).catch((error) => {
                console.log(error);
            });
        }


    }


render()
{
    return (
        <div id="adminDashboard" className="page">
            <div className="pageTitle">
                <h1>Admin Panel</h1>
            </div>
            <div className="container-fluid">


                <div className="row">


                    <div className="col-lg-9 col-xs-12">

                        <div className="ui pointing menu">
                            <button className={`item ${this.state.displayView === 'userReports' ? 'active' : '' }`}
                                    onClick={this.displayView.bind(this, 'userReports')}>
                                User Reports
                                {/*<div class="ui teal left pointing label">3</div>*/}
                            </button>
                            <button className={`item ${this.state.displayView === 'userStatus' ? 'active' : '' }`}
                                    onClick={this.displayView.bind(this, 'userStatus')}>
                                User Status
                            </button>
                            <button className={`item ${this.state.displayView === 'userRoles' ? 'active' : '' }`}
                                    onClick={this.displayView.bind(this, 'userRoles')}>
                                User Roles
                            </button>

                        </div>

                        { this.state.displayView === 'userStatus' && <div className="ui segment">
                            <h2>User Status</h2>
                            <div className="ui middle aligned divided list">
                                <UserStatus users={this.state.users}/>
                            </div>
                        </div> }


                        { this.state.displayView === 'userRoles' && <div className="ui segment">
                            <h2>User Roles</h2>
                            <div className="userList ui middle aligned divided list">
                                <UserRoles users={this.state.users}/>
                            </div>
                        </div> }

                        { this.state.displayView === 'userReports' && <div className="ui segment userReports">
                            <h2>New Reports</h2>
                            <div className="ui middle aligned divided list">
                                <Reports reports={this.state.reports} archiveList={this.archiveList}/>
                            </div>

                            <h2>Archived Reports</h2>
                            <div className="ui middle aligned divided list">
                                <ArchivedReports archivedReports={this.state.archivedReports}/>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
}

export default AdminDashboard;