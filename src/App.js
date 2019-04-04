import React from 'react';
import './App.css';

import {Redirect, Switch, Route} from 'react-router-dom';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import CreateStory from './CreateStory/CreateStory';

import SignUp from './SignUp/Signup';
import StoryIPR from './Story/StoryIPR';
import Profile from './Profile/Profile';
import adminDashboard from './AdminDashboard/AdminDashboard';
import About from './About/About';


// routes
function Main() {
    return (
        <main>
            <Switch>

                <Redirect exact from="/" to="/about"/>


                <Route path='/landing' component={Landing}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/adminDashboard' component={adminDashboard}/>
                <Route path='/profile/:id' component={Profile}/>
                <Route path='/createStory' component={CreateStory}/>
                <Route path='/story/:id' component={StoryIPR}/>
                <Route path='/about' component={About}/>

            </Switch>
        </main>
    );
}



// tester
// function placeholder() {
//     return (
//         <div>
//             <h1>holds place for some path</h1>
//         </div>
//     );
// }


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
