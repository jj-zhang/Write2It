import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">*/}
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            {/*<p>*/}
            {/*Edit <code>src/App.js</code> and save to reload.*/}
            {/*</p>*/}
            {/*<a*/}
            {/*className="App-link"*/}
            {/*href="https://reactjs.org"*/}
            {/*target="_blank"*/}
            {/*rel="noopener noreferrer"*/}
            {/*>*/}
            {/*Learn React*/}
            {/*</a>*/}
            {/*</header>*/}



        <div class="container">
          <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">WriteIt</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Signup</a>
                </li>
              </ul>
            </div>
          </nav>
      </div>



      </div>



    );
  }
}

export default App;
