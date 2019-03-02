import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import LoginBox from '../Auth/Auth';

class Header extends React.Component {
    constructor(props) {
        super(props);
        // on rendered get loginStatus from localstorage, if not stored then it must be a 
        // guest
        let user = localStorage.getItem("loginStatus");
        if (user === null){
            user = "guest";
        }
        this.state = {
            usertype:user,
            displayLoginBox: false,
        };
    }

    logout = e =>{
        e.preventDefault();
        if (localStorage.getItem('loginStatus')!==null){
            // if the current login state is login
            // CODE FOR SEND LOGOUT REQUEST TO SERVER
            localStorage.removeItem("loginStatus");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            // refresh the page
            window.location.reload();
        }
        
    }

    displayloginbox = e =>{
        e.preventDefault();
        this.setState(
            {displayLoginBox:true}
        )

    }

    closeloginbox = () =>{
        this.setState(
            {displayLoginBox:false}
        );
    }




    render () {
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
                            <ul className="navbar-nav">
                                {
                                    this.state.usertype==="guest" ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/signup'>Signup</Link>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.usertype==="guest" ?
                                    <li className="nav-item">
                                        <div className="nav-link act-as-a" onClick={this.displayloginbox}>Login</div>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.usertype!=="guest" ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/userProfile'>Profile</Link>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.usertype!=="guest" ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/createstory'>Create Story</Link>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.usertype==="admin" ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/adminDashboard'>Admin Panel</Link>
                                    </li>:
                                    null
                                }
                                {
                                    this.state.usertype!=="guest" ?
                                    <li className="nav-item">
                                        <div className="nav-link act-as-a" onClick={this.logout}>Logout</div>
                                    </li>:
                                    null
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
                {this.state.displayLoginBox?
                <LoginBox hide={this.closeloginbox.bind(this)}/>:null}
            </header>
        );
    }
}


export default Header;
