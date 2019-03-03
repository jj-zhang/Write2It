import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import Auth from '../Auth/Auth';
import {logout} from '../db/users';

class Header extends React.Component {
    constructor(props) {
        super(props);

        // on rendered get loginStatus from localstorage, if not stored then it must be a 
        // guest
        this.state = {
            userType: localStorage.getItem('loginStatus') || 'guest',
            username: localStorage.getItem('username'),
            displayLoginBox: false,
        };
    }

    logout = e => {
        e.preventDefault();

        // fake API call to logout users
        if (logout()) {
            //refresh the page
            window.location.reload();
        }
    }

    displayloginbox = e => {
        e.preventDefault();
        this.setState(
            {displayLoginBox: true}
        )

    }

    closeloginbox = () => {
        this.setState(
            {displayLoginBox: false}
        );
    }


    render() {
        return (
            <header>
                <div className="container">
                    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand" to="/">WriteIt</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav  mr-auto">
                                {
                                    this.state.userType === "guest" ?
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/signup'>Signup</Link>
                                        </li> :
                                        null
                                }
                                {
                                    this.state.userType === "guest" ?
                                        <li className="nav-item">
                                            <div className="nav-link act-as-a" onClick={this.displayloginbox}>Login
                                            </div>
                                        </li> :
                                        null
                                }
                                {
                                    this.state.userType !== "guest" ?
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/userProfile'>Profile</Link>
                                        </li> :
                                        null
                                }
                                {
                                    this.state.userType !== "guest" ?
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/createStory'>Create Story</Link>
                                        </li> :
                                        null
                                }
                                {
                                    this.state.userType === "admin" ?
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/adminDashboard'>Admin Panel</Link>
                                        </li> :
                                        null
                                }
                                {
                                    this.state.userType !== "guest" ?
                                        <li className="nav-item">
                                            <div className="nav-link act-as-a" onClick={this.logout}>Logout</div>
                                        </li> :
                                        null
                                }


                            </ul>

                            {
                                this.state.userType !== "guest" ?
                                    <span className="user navbar-text">
                                        Logged in as: <strong>{this.state.username}</strong>
                                    </span> :
                                    null
                            }

                        </div>

                    </nav>
                </div>
                {this.state.displayLoginBox ?
                    <Auth hide={this.closeloginbox.bind(this)}/> : null}
            </header>
        );
    }
}


export default Header;
