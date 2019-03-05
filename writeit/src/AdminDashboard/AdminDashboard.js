import React, { Component } from 'react'
import UserStatus from './UserStatus';
import Reports from './Reports';
import ArchivedReports from './ArchivedReports';
import UsersList from './UsersList';


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [
                {
                    id: 1,
                    name: "Mike",
                    category: "Bug",
                    time: "3 days ago",
                    content: "Hello, I cannot seem to create new stories."
                },
                {
                  id: 2,
                  name: "John",
                  category: "Suggestion",
                  time: "1 week ago",
                  content: "Hi, I suggest that we can change the background color."
                },
                {
                  id: 3,
                  name: "Sam",
                  category: "Bug",
                  time: "3 days ago",
                  content: "Hey, I cannot vote to the new story."
                } 
            ],
            archivedReports: [               
              {
                  id: 4,
                  name: "Eason",
                  category: "Bug",
                  time: "3 days ago",
                  content: "Hello, I cannot log into the page."
              }
            ],

            users: [
                {
                    id: 1,
                    name: 'user',
                    password: 'user',
                    userType: 'user',
                    email: 'hi@gmail.com',
                    src: process.env.PUBLIC_URL + '/assets/images/boy-2.svg'
                },
               {
                    id:2,
                    name: 'admin',
                    password: 'admin',
                    userType: 'admin',
                    email: 'hi@gmail.com',
                    src: process.env.PUBLIC_URL + '/assets/images/girl-2.svg'
                }
            ]
        }
        this.archiveList = this.archiveList.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    archiveList = (id) => {
        var getReport = this.state.reports.find(obj => {
            return obj.id === id;
        });
      this.setState(prevState => ({
        reports: prevState.reports.filter(el => el.id !== id),
        archivedReports: [...prevState.archivedReports, getReport]
      }));
    }

    removeUser = (id) => {
        this.setState(prevState => ({
            users: prevState.users.filter(el => el.id !== id),
        }));
    }

    getById = (idToSearch) => {
        return this.state.reports.filter(report => report.id === idToSearch);
    }

    changeStatus = (id) => {

    }

    render() {
        return (
            <div className="container col-lg-6 col-xs-12">
                <div className="ui segment">
                    <div className="ui middle aligned divided list">
                    <UserStatus users={this.state.users}/>
                    </div>
                </div>
                <div className="ui segment">
                    <h2>Admin Role</h2>
                    <div className="userList ui middle aligned divided list">
                    <UsersList users={this.state.users} removeUser={this.removeUser}/>
                    </div>
                </div>

        <div id="landing" className="page">
            <div className="pageTitle">
                <h1>Admin Panel</h1>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-9 col-xs-12">
                        <div className="ui segment">
                            <div className="ui middle aligned divided list">
                                <UserStatus users={this.state.users}/>
                            </div>
                        </div>
                        <div className="ui segment">
                            <div className="userList ui middle aligned divided list">
                                <UsersList users={this.state.users} removeUser={this.removeUser}/>
                            </div>
                        </div>

                        <div className="ui segment userReports">
                            <h2>New Reports</h2>
                            <div className="ui middle aligned divided list">
                                <Reports reports={this.state.reports} archiveList={this.archiveList}/>
                            </div>

                            <h2>Archived Reports</h2>
                            <div className="ui middle aligned divided list">
                                <ArchivedReports archivedReports={this.state.archivedReports}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        );
    }
}

export default AdminDashboard;