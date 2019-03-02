import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Auth from '../Auth/Auth';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // usertype should be undefined/admin/user stored in localhost and status would be guest admin user
            // for safety a hash string is also stored in localstorage
            // this can be either stored in to a redux store or passed in as props, even can be stored into localstorage
            usertype: "user",
            displayAuth: false,
        };

    }

    logout(e) {
        e.preventDefault();
        console.log("LOGOUT");
        // should store login status info in localstorage
        localStorage.removeItem("loginstatus");
        this.setState(
            {userType: "guest"}
        );
    }

    displayAuth(e) {
        e.preventDefault();
        this.setState(
            {displayAuth:true}
        );
    }

    closeAuth() {
        this.setState(
            {displayAuth:false}
        );
    }

    render () {
        return (
            <header>
                <div className="container">
                    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">WriteIt</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {
                                    this.state.userType==="guest" ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/signup'>Signup</Link>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.userType==="guest" ?
                                    <li className="nav-item">
                                        <a className="nav-link" href="" onClick={this.displayAuth.bind(this)}>Login</a>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.userType!=="guest" ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/userProfile'>Profile</Link>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.userType!=="guest" ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/createStory'>Create Story</Link>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.userType!=="guest" ?
                                    <li className="nav-item">
                                        <a className="nav-link" href="" onClick={this.logout.bind(this)}>Logout</a>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.userType==="admin" ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/adminDashboard'>Admin Dashboard</Link>
                                    </li>:
                                    null
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
                <Auth show={this.state.displayAuth} hide={this.closeAuth}/>
            </header>
        );
    }
}


export default Header;
