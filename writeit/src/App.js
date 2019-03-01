import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import Header from './Header/Header';


import Landing from './Landing/Landing';
import createStory from './CreateStory/CreateStory';



// routes
function Main() {
    return (
        <main style={{paddingTop:"50px"}}>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route path='/signup' component={Landing}/>
                <Route path='/adminDashboard' component={Landing}/>
                <Route path='/userProfile' component={Landing}/>
                <Route path='/createstory' component={createStory}/>
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

                {/*<footer class="footer">*/}
                    {/*WriteIt*/}
                {/*</footer>*/}

            </div>
        );
    }
}

export default App;
