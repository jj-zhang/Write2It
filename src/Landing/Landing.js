'use strict';

import React from 'react';
import {getPage, updateStory} from '../db/stories';
import {formatDistance, subDays} from 'date-fns';
import {Redirect} from 'react-router';
import Auth from '../Auth/Auth';
import {Link} from 'react-router-dom';
import {authmiddleware} from '../Session/AuthSession';

// component to render a story
class Story extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            story: this.props.story,
            upvoteCount: 0,
            upvotedBy: [],
            downvotedBy: []
        };
    }

    // view a story
    goToStoryView(e) {
        e.preventDefault();
        const url = "/story/" + this.state.story._id;
        const request = new Request(url, {
            method: 'post', 
            body: null,
            headers: {
                'Accept': 'application/json'
            },
        });
        fetch(request).then(
            (res)=>{
                return authmiddleware(res);
            }
        ).then(
            (res)=>{
                if (res.status != 200){
                    alert("woops! error code:"+res.status);
                }else{
                    return res.json()
                }
            }
        ).then(
            (res)=>{
                window.location.href="/story/"+res._id;
            }
        )
    }

    // upvote a story, where val is 1 or -1 (representing the increment)
    upvote(val) {
        const story = this.state.story;
        const user = localStorage.getItem('username');
        console.log(localStorage);
        if (!user) {
            // user is unauthenticated so bring up the login page
            this.props.displayLoginBox();

            return;
        }

        if (val === 1) {
            for(let i=0;i< this.state.upvotedBy.length;i++){
                if(user === this.state.upvotedBy[i]){
                    
                }
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
                        className={`upvoteButton up ${ true ? ' upvoted' : ''}`}
                        onClick={
                            (e) => {
                                e.stopPropagation();
                                this.upvote.bind(this)(1);
                            }}>
                        <i className="arrow up icon"/>
                    </button>
                    <div className="value center">{this.state.upvoteCount}</div>
                    <button
                        className={`upvoteButton down ${ true ? ' downvoted' : ''}`}
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
                        Created by <Link className="author" to={`/profile/${story.author.name}`}>{story.author.name}</Link> <span
                        className="date">{formatDistance(subDays(new Date(story.createdAt), 0), new Date())} ago</span>
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
        this.state = {cursor: 1, hasMore: true, stories: []};
    }


    componentDidMount() {
        this.loadMore();
    }

    // load another page of stories
    loadMore() {

        fetch('/story/' + this.state.cursor)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return Promise.reject("Could not find stories");
                }
            })
            .then((json) => {
                this.setState({stories: this.state.stories.concat(json.docs), cursor: this.state.cursor + 1, hasMore: json.page < json.pages});
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                {this.state.stories.length > 0
                    ? this.state.stories.map((story) =>
                        <Story displayLoginBox={this.props.displayLoginBox} key={story.id} story={story}/>)
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