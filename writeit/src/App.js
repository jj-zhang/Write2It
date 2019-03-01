import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import Header from './Header/Header';


import LandingPage from './Landing/Landing';





// routes
function Main() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={LandingPage}/>
                <Route path='/placeholder' component={placeholder}/>
            </Switch>
        </main>
    );
}

// tester
function placeholder() {
    return (
        <div>
            <h1>holds place for some path</h1>
        </div>
    );
}


class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}

export default App;
