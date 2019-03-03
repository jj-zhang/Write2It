import React from 'react';
import './Landing.css';
import {getPage, updateStory} from '../db/stories';
import {formatDistance, subDays} from 'date-fns';
import {Redirect} from 'react-router';

class Story extends React.Component {
    constructor(props) {
        super(props);

        this.state = {goToStoryViewClicked: false, story: this.props.story};
    }

    // view a story
    goToStoryView() {
        this.setState({goToStoryViewClicked: true});
    }

    // upvote a story, where val is 1 or -1 (representing the increment)
    upvote(val) {
        const story = this.state.story;
        const user = localStorage.getItem('username');

        if (!user) {
            return 0;
        }

        if (val === 1) {
            if (story.upvotedBy.includes(user)) {
                val = -1;
                story.upvotedBy = story.upvotedBy.filter((e) => e !== user);
            } else if (story.downvotedBy.includes(user)) {
                story.downvotedBy = story.downvotedBy.filter((e) => e !== user);
            } else {
                story.upvotedBy.push(user);
            }
        } else {
            if (story.upvotedBy.includes(user)) {
                story.upvotedBy = story.upvotedBy.filter((e) => e !== user);
            } else if (story.downvotedBy.includes(user)) {
                val = 1;
                story.downvotedBy = story.downvotedBy.filter((e) => e !== user);
            } else {
                story.downvotedBy.push(user);
            }
        }

        story.upvotes += val;

        // update the database with new story upvote count (this is a fake API call)
        const response = updateStory(story);

        if (response) {
            this.setState({story: response});
        }

    }

    render() {
        const story = this.state.story;

        return this.state.goToStoryViewClicked ? <Redirect to="/CreateStory"/> : (
            <div className="story" onClick={this.goToStoryView.bind(this)}>
                <div className="upvotes">
                    <button className={`upvoteButton up ${(story.upvotedBy.includes(localStorage.getItem('username')) ? ' upvoted' : '')}`} onClick={
                        (e) => {
                            e.stopPropagation();
                            this.upvote.bind(this)(1);
                        }}>
                        <i className="arrow up icon"></i>
                    </button>
                    <div className="value center">{story.upvotes}</div>
                    <button className={`upvoteButton down ${(story.downvotedBy.includes(localStorage.getItem('username')) ? ' downvoted' : '')}`} onClick={
                        (e) => {
                            e.stopPropagation();
                            this.upvote.bind(this)(-1);
                        }}>
                        <i className="arrow down icon"></i>
                    </button>

                </div>

                <div className="content">
                    <div className="metadata">
                        Created by <a className="author">{story.author}</a> <span
                        className="date">{formatDistance(subDays(story.dateCreated, 3), new Date())} ago</span>


                        {story.status === 'IPR' ?
                            <span className="status inprogress"> (in progress)</span>
                            :
                            <span className="status"> (completed)</span>
                        }

                        </div>

                    <h3 className="storyTitle">{story.title}</h3>
                    <p className="text">{story.description}</p>
                </div>
            </div>
        );
    }
}

class Stories extends React.Component {
    constructor(props) {
        super(props);

        // get a page stories from database (this is a fake API call)
        this.state = {stories: getPage(0), cursor: 1, hasMore: true};
    }

    // load another page of stories
    loadMore() {
        let stories = this.state.stories;
        // get a page stories from database (this is a fake API call)
        const newPage = getPage(this.state.cursor + 1);

        if (newPage.length === 0) {
            this.setState({hasMore: false});
        } else {
            stories = stories.concat(newPage);
            this.setState({stories: stories, cursor: this.state.cursor + 1});
        }

    }


    render() {
        return (
            <div>
                {this.state.stories.length > 0
                    ? this.state.stories.map((story) =>
                        // sort stories based on recency and upvotes
                        <Story key={story.id.toString()} story={story}/>)
                    : null}
                {this.state.hasMore ?  <button className="ui teal button loadMoreButton" onClick={this.loadMore.bind(this)}>Load more</button>
                    : <h3>No more stories to load.</h3> }
            </div>

        );
    }
}


class Landing extends React.Component {
    render() {
        return (
            <div id="landing" className="page">

                <div className="pageTitle">
                    <h1>Top Stories</h1>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="offset-lg-3 col-lg-6 col-xs-12">
                            {/*<button className="ui massive teal button" onClick={this.createStory.bind(this)}>Create Story</button>*/}

                            {/*<button className="ui massive teal button"><Link to='/createstory'>Create Story</Link>*/}
                            {/*</button>*/}
                            <Stories/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Landing;