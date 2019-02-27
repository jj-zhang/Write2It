import React, { Component } from 'react';
import './Landing.css';
import stories from '../db/stories';
import appState from '../db/appState';

// import { Switch, Route, Link } from 'react-router-dom';


class Story extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const story = this.props.story;

        return (
            <div>
                <h1>{story.title}</h1>
                <p>Created by {story.author} on {story.date.toString()}</p>
                <p>{story.upvotes}</p>

                {appState.userType == 'a' &&
                <h2>
                    Delete
                </h2>
                }

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
        const stories = this.props.stories;

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

    createStory() {
        stories.push(
            {
                id: 0,
                title: 'blah',
                author: 'blah,',
                date: new Date(),
                upvotes: 1
            }
        );

        console.log(stories.length);

        this.setState({stories: stories});
    }


    render() {
        return (
            <div className="landing page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-xs-12">
                            <button className="ui massive teal button" onClick={this.createStory.bind(this)}>Create Story</button>
                            <h1>Top Stories</h1>
                            <Stories stories={this.state.stories}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;