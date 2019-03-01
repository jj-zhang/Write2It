import React from 'react';
import './Landing.css';
// import { Switch, Route, Link } from 'react-router-dom';



class Story extends React.Component {
    constructor(props) {
        super(props);
        this.props = {placeholder:"placeholder"};
    }

    render() {
        const story = this.props.story;

        return (
            <li>
                <h1>{story.title}</h1>
                <p>Created by {story.author} on {story.date.toString()}</p>
                <p>{story.upvotes}</p>
            </li>
        );
    }
}


class Stories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stories:
                [
                    {
                        id: 0,
                        title: 'blah',
                        author: 'blah,',
                        date: new Date(),
                        upvotes: 1
                    },
                    {
                        id: 1,
                        title: 'blah',
                        author: 'blah,',
                        date: new Date(),
                        upvotes: 1
                    },
                    {
                        id: 2,
                        title: 'blah',
                        author: 'blah,',
                        date: new Date(),
                        upvotes: 1
                    },
                    {
                        id: 3,
                        title: 'blah',
                        author: 'blah,',
                        date: new Date(),
                        upvotes: 1
                    },
                    {
                        id: 4,
                        title: 'blah',
                        author: 'blah,',
                        date: new Date(),
                        upvotes: 1
                    }
            ]
        }

    }

    render() {
        const stories = this.state.stories;

        const items =  stories.map((story) =>
            <Story key={story.id.toString()} story={story} />
        );


        return (
            <ul>{items}</ul>
        );
    }
}

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {placeholder:"placeholder"};
    }

    render() {
        return (
            <div>
                <h1>Top Stories</h1>
                <Stories />
            </div>
        );
    }

}

export default Landing;