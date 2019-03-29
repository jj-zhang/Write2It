'use strict';

import React from 'react';
import {getPage, updateStory} from '../db/stories';
import {formatDistance, subDays} from 'date-fns';
import {Redirect} from 'react-router';
import Auth from '../Auth/Auth';
import {Link} from 'react-router-dom';

// component to render a story
class Story extends React.Component {
    constructor(props) {
        super(props);

        this.state = {goToStoryViewClicked: false, story: this.props.story};
    }

    // view a story
    goToStoryView(e) {
        e.preventDefault();
        this.setState({goToStoryViewClicked: true});
    }

    // upvote a story, where val is 1 or -1 (representing the increment)
    upvote(val) {
        const story = this.state.story;
        const user = localStorage.getItem('username');

        if (!user) {
            // user is unauthenticated so bring up the login page
            this.props.displayLoginBox();

            return;
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

        return this.state.goToStoryViewClicked ? <Redirect to={`../story/${this.state.story.id}`}/> : (
            <div className="story" onClick={this.goToStoryView.bind(this)}>
                <div className="upvotes">
                    <button
                        className={`upvoteButton up ${(story.upvotedBy.includes(localStorage.getItem('username')) ? ' upvoted' : '')}`}
                        onClick={
                            (e) => {
                                e.stopPropagation();
                                this.upvote.bind(this)(1);
                            }}>
                        <i className="arrow up icon"/>
                    </button>
                    <div className="value center">{story.upvotes}</div>
                    <button
                        className={`upvoteButton down ${(story.downvotedBy.includes(localStorage.getItem('username')) ? ' downvoted' : '')}`}
                        onClick={
                            (e) => {
                                e.stopPropagation();
                                this.upvote.bind(this)(-1);
                            }}>
                        <i className="arrow down icon"/>
                    </button>
                </div>

                <div className="content">
                    <div className="metadata">
                        Created by <Link className="author" to={`/profile/${story.author}`} >{story.author}</Link> <span
                        className="date">{formatDistance(subDays(story.dateCreated, 0), new Date())} ago</span>
                        {/*{story.status === 'IPR' ?*/}
                            {/*<span className="status inprogress"> (in progress)</span>*/}
                            {/*:*/}
                            {/*<span className="status"> (completed)</span>*/}
                        {/*}*/}
                    </div>
                    <h3 className="storyTitle">{story.title}</h3>
                    <p className="text">{story.description}</p>
                </div>
            </div>
        );
    }
}

// component wrapping a list of stories
class Stories extends React.Component {
    constructor(props) {
        super(props);
        // Fake API call to get a page stories from database
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
                        <Story displayLoginBox={this.props.displayLoginBox} key={story.id.toString()} story={story}/>)
                    : null}

                {this.state.hasMore ?
                    <button className="ui teal button loadMoreButton" onClick={this.loadMore.bind(this)}>Load
                        more</button>
                    : <div className="text-center">No more stories to load.</div> }
            </div>

        );
    }
}

// react component to render the landing page
class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {displayLoginBox: false};
    }

    // display login box
    displayLoginBox() {
        this.setState(
            {displayLoginBox: true}
        );
    }

    // close the loginbox
    closeLoginBox() {
        this.setState(
            {displayLoginBox: false}
        );
    }

    render() {
        return (
            <div>
                <div id="landing" className="page">
                    <div className="pageTitle">
                        <h1>Top Stories</h1>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-9 col-xs-12">
                                <Stories displayLoginBox={this.displayLoginBox.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.displayLoginBox && <Auth hide={this.closeLoginBox.bind(this)}/>}
            </div>

        );
    }
}

export default Landing;