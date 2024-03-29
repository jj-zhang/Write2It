import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import Auth from '../Auth/Auth';
import ContactForm from '../FileReport/ContactForm'
import {onlogout} from "../Session/AuthSession"

// component to render the header
class Header extends React.Component {
    constructor(props) {
        super(props);
        // on rendered get loginStatus from localstorage, not stored implies it is a guest
        // default dont present any form to user
        this.state = {
            userType: localStorage.getItem('loginStatus') || 'guest',
            username: localStorage.getItem('username'),
            profilePhoto: null,
            displayLoginBox: false,
            displayContactForm: false,
        };
    }

    logout = (e) => {
        e.preventDefault();
        const request = new Request("/logout", {
            method: 'delete',
        });
        fetch(request)
        onlogout();
    }

    // the following functions simply display/hide the login boxes
    displayLoginBox = e => {
        e.preventDefault();
        this.setState(
            {displayLoginBox: true}
        );
    }

    closeLoginBox = () => {
        this.setState(
            {displayLoginBox: false}
        );
    }

    closeContactForm = () =>{
        this.setState({displayContactForm: false})
    }

    displayContactForm = () =>{
        this.setState({displayContactForm: true})
    }

    render() {
        return (
            <header>
                <div className="container">
                    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-sm">
                        <Link className="navbar-brand" to="/">WriteIt</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">


                            <ul className="navbar-nav  mr-auto">


                                <li className="nav-item">
                                    <Link className="nav-link" to='/landing'>Stories</Link>
                                </li>

                                {
                                    this.state.userType === "guest" &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/signup'>Signup</Link>
                                    </li>
                                }
                                {
                                    this.state.userType === "guest" &&
                                    <li className="nav-item">
                                        <div className="nav-link act-as-a" onClick={this.displayLoginBox}>Login
                                        </div>
                                    </li>
                                }
                                {
                                    this.state.userType !== "guest" &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/profile/${this.state.username}`}>Profile</Link>
                                    </li>
                                }
                                {
                                    this.state.userType !== "guest" &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/createStory'>Create Story</Link>
                                    </li>
                                }
                                {
                                    this.state.userType === "admin" &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/adminDashboard'>Admin Panel</Link>
                                    </li>
                                }

                                {
                                    this.state.userType !== "guest" && 
                                    <li className="nav-item">
                                        <div className="nav-link act-as-a" onClick={this.displayContactForm}>Contact Us</div>
                                    </li>
                                }

                                <li className="nav-item">
                                    <Link className="nav-link" to='/about'>About</Link>
                                </li>


                                {

                                    this.state.userType !== "guest" &&
                                    <li className="nav-item">
                                        <div className="nav-link act-as-a" onClick={this.logout}>Logout</div>
                                    </li>
                                }



                            </ul>

                            {
                                this.state.userType !== "guest" &&
                                <span className="user navbar-text">
                                   <Link to={`/profile/${this.state.username}`}>
                                    {/*<img className="profilePic" src={this.state.profilePhoto || placeholderimage} />*/}
                                       Logged in as: <strong>{this.state.username}</strong></Link>
                                </span>
                            }

                        </div>

                    </nav>
                </div>
                {this.state.displayLoginBox && <Auth hide={this.closeLoginBox.bind(this)}/>}
                {this.state.displayContactForm && <ContactForm hide={this.closeContactForm.bind(this)}/>}
            </header>
        );
    }
}


export default Header;
