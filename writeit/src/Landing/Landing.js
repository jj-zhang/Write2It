import React, { Component } from 'react';
import './Landing.css';
import stories from '../db/stories';

import { Link } from 'react-router-dom';
import { isAfter, formatDistance, subDays } from 'date-fns';



class Story extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const story = this.props.story;




        return (
            <div>
                <h3>{story.title}</h3>
                <p>Created by {story.author} {formatDistance(subDays(story.dateCreated, 3), new Date())} ago</p>
                <p>{story.upvotes}</p>

                {/*{appState.userType == 'a' &&*/}
                {/*<h2>*/}
                    {/*Delete*/}
                {/*</h2>*/}
                {/*}*/}

            </div>
        );
    }
}

class Stories extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {stories: stories}
    // }

    render() {
        // sort stories based on recency and upvotes
        const stories = this.props.stories;
        // const stories = Object.keys(this.props.stories).sort((a, b) => isAfter(a.dateCreated, b.dateCreated) * 0.5 + (a.upvotes - b.upvotes) / (a.upvotes + b.upvotes) * 0.5);

        const items =  stories.map((story) =>
            <Story key={story.id.toString()} story={story} />
        );


        return (
            <div>{items}</div>
        );
    }
}

class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {stories: stories};
    }

    // createStory() {
    //     stories.push(
    //         {
    //             id: 0,
    //             title: 'blah',
    //             author: 'blah,',
    //             date: new Date(),
    //             upvotes: 1
    //         }
    //     );
    //
    //     console.log(stories.length);
    //
    //     this.setState({stories: stories});
    // }


    render() {
        return (
            <div className="landing page">

                <div className="pageTitle">
                    <h1>Top Stories</h1>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-xs-12">
                            {/*<button className="ui massive teal button" onClick={this.createStory.bind(this)}>Create Story</button>*/}

                            {/*<button className="ui massive teal button"><Link to='/createstory'>Create Story</Link>*/}
                            {/*</button>*/}


                            <Stories stories={this.state.stories}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;