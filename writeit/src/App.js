import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';


import Landing from './Landing/Landing';
import createStory from './CreateStory/CreateStory';
import { create } from 'domain';



// navbar
class Header extends React.Component {
    render () {
        return (
            <header>
                <div className="container">
                    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">WriteIt</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to='/Login'>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/Signup'>Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/createstory'>c</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}


// routes
function Main() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route path='/login' component={Landing}/>
                <Route path='/schedule' component={Home}/>
                {/*I changed the route name to create story because it's more specific*/}
                <Route path='/createstory' component={createStory}/>
            </Switch>
        </main>
    );
}

// tester
function Home() {
    return (
        <div>
            <h1>Welcome to the Tornadoes Website!</h1>
        </div>
    );
}


class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Main />

                {/*<footer class="footer">*/}
                    {/*WriteIt*/}
                {/*</footer>*/}

            </div>
        );
    }
}

export default App;
