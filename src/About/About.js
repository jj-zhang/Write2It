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

            <div class="container shadow-sm">
                <div class="header">
                    <h1 class="title">WriteIt</h1>

                    <h2>Collaborative story-writing</h2>
                </div>

                <p>
                    Learning English can be a daunting task.
                    <span>WriteIt!</span> is a game that supports players in learning English.
                    In the game, users piece together stories both collectively and incrementally;
                    that is, each user contributes one sentence at a time, building from where a story had been
                    previously left off by other users!
                </p>

                <p>
                    In <span className="gameTitle">WriteIt!</span>, users are given a specific word that they
                    must incorporate in each sentence that they contribute. In this way, as a by-product of playing the
                    game, users are able to foster better writing skills, build their vocabulary, and ultimately
                    hone their mastery of English.
                    <img src="/assets/images/about1.png"/>
                </p>


                <p>
                    Players of <span className="gameTitle">WriteIt!</span> must also compete for their sentences to be included in a story.
                    The first candidate sentence that receives 10 upvotes get selected as the next sentence to be added to a story.
                    <img src="/assets/images/about2.png"/>
                </p>



                <button className="ui massive teal button"><Link to='/landing'>Play</Link></button>


            </div>


        </div>;
    }
}

export default About;