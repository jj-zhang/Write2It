import React from 'react';
import {Link} from 'react-router-dom';
import './About.css';

// react component to render the create story view
/*
 This is used for creating a story.
 The user can create a story here(must fill the title and what is the story about).
 After clicking the "create story" button, the users will get a story in progress page
 created from the user's input
 */
class About extends React.Component {
    render() {
        return <div id="about" className="page">
            <div class="header">
                <h1 class="title">WriteIt</h1>

                <h2>Collaborative story-writing</h2>
            </div>
            <div class="container shadow-sm">


                <p>
                    Learning English can be a daunting task.
                    <span className="gameTitle">WriteIt!</span> is a game that supports players in learning English.
                    In the game, users piece together stories both collectively and incrementally;
                    that is, each user contributes one sentence at a time, building from where a story had been
                    previously left off by other users!
                </p>

                <p>
                    In <span className="gameTitle">WriteIt!</span>, users are given a specific word that they
                    must incorporate in each sentence that they contribute. In this way, as a by-product of playing the
                    game, users are able to foster better writing skills, build their vocabulary, and ultimately
                    hone their mastery of English.
                </p>

                <img src="/assets/images/about1.png" alt="explanation image"/>

                <p>
                    Players of <span className="gameTitle">WriteIt!</span> must also compete for their sentences to be
                    included in a story.
                    The sentence that is first to reach 10 upvotes gets selected as the next addition
                    to a story.
                </p>

                <img src="/assets/images/about2.png" alt="explanation image"/>


                <Link className="ui massive teal button" to='/landing'>Play</Link>


            </div>


        </div>;
    }
}

export default About;