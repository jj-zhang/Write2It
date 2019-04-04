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
        this.updateRole = this.updateRole.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    componentDidMount() {
        this.setDisplayView('userReports');
    };

    // The function to archive the report list and add it to the archive report list.
    archiveList = (id) => {
        const url = '/message/' + id;

        const data = {
            solved: true
        };


        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
            .then((result) => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    return Promise.reject("Could not update reports.");
                }
            })
            .then((json) => {
                this.setDisplayView('userReports');
            }).catch((error) => {

        });
    };

    updateRole = (id, role) => {
        const url = '/user/' + id;

        const data = {
            role: role
        };

        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
            .then((result) => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    return Promise.reject("Could not update user.");
                }
            })
            .then((json) => {
                this.setDisplayView('userRoles');
            }).catch((error) => {

        });
    };

    updateStatus = (id, status) => {
        const url = '/user/' + id;

        const data = {
            status: status
        };

        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
            .then((result) => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    return Promise.reject("Could not update user.");
                }
            })
            .then((json) => {
                this.setDisplayView('userStatus');
            }).catch((error) => {

        });
    };

    // display view (user reports, user status, user roles)
    setDisplayView(viewName) {
        this.setState({displayView: viewName});


        if (viewName === 'userReports') {
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
                        reports: json
                    });
                    return fetch('/message?solved=true');

                }).then((result) => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    return Promise.reject("Could not find reports.");
                }
            }).then((json) => {
                this.setState({
                    archivedReports: json
                });
            }).catch((error) => {

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


    render() {
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
                                        onClick={this.setDisplayView.bind(this, 'userReports')}>
                                    User Reports
                                    {/*<div class="ui teal left pointing label">3</div>*/}
                                </button>
                                <button className={`item ${this.state.displayView === 'userStatus' ? 'active' : '' }`}
                                        onClick={this.setDisplayView.bind(this, 'userStatus')}>
                                    User Status
                                </button>
                                <button className={`item ${this.state.displayView === 'userRoles' ? 'active' : '' }`}
                                        onClick={this.setDisplayView.bind(this, 'userRoles')}>
                                    User Roles
                                </button>

                            </div>

                            { this.state.displayView === 'userStatus' && <div className="ui segment">
                                <h2>User Status</h2>
                                <div className="ui middle aligned divided list">
                                    <UserStatus users={this.state.users} updateStatus={this.updateStatus}/>
                                </div>
                            </div> }


                            { this.state.displayView === 'userRoles' && <div className="ui segment">
                                <h2>User Roles</h2>
                                <div className="userList ui middle aligned divided list">
                                    <UserRoles users={this.state.users} updateRole={this.updateRole}/>
                                </div>
                            </div> }

                            { this.state.displayView === 'userReports' && <div className="ui segment userReports">
                                <h2>New Reports</h2>

                                {this.state.reports.length > 0 ?

                                    <div className="ui middle aligned divided list">
                                        <Reports reports={this.state.reports} archiveList={this.archiveList}/>
                                    </div>
                                    :

                                    <div><span>No new reports.</span></div>
                                }

                                <h2>Archived Reports</h2>

                                {this.state.archivedReports.length > 0 ?

                                    <div className="ui middle aligned divided list">
                                        <ArchivedReports archivedReports={this.state.archivedReports}/>
                                    </div>
                                    :
                                    <div><span>No archived reports.</span></div>
                                }


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