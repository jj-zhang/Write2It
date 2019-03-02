import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import LoginBox from './LoginBox';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // usertype should be undefined/admin/user stored in localhost and status would be guest admin user
            // for safety a hash string is also stored in localstorage
            // this can be either stored in to a redux store or passed in as props, even can be stored into localstorage
            usertype:"user",
            displayLoginBox: false,
        };

        this.logout = e =>{
            e.preventDefault();
            console.log("LOGOUT");
            // should store login status info in localstorage
            localStorage.removeItem("loginstatus");
            this.setState(
                {usertype:"guest"}
            )
        }

        this.displayloginbox = e =>{
            e.preventDefault();
            this.setState(
                {displayLoginBox:true}
            )

        }

        this.closeloginbox = () =>{
            this.setState(
                {displayLoginBox:false}
            );
        }
    }
    render () {
        return (
            <header>
                <div className="container">
                    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/landing">WriteIt</a>
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
                                        <a className="nav-link" href="" onClick={this.displayloginbox}>Login</a>
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
                                    this.state.usertype!=="guest" ?
                                    <li className="nav-item">
                                        <a className="nav-link" href="" onClick={this.logout}>Logout</a>
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
                            </ul>
                        </div>
                    </nav>
                </div>
                <LoginBox show={this.state.displayLoginBox} hide={this.closeloginbox}/>
            </header>
        );
    }
}


export default Header;
