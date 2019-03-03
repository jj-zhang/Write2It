import React from 'react';
import {th} from 'date-fns/esm/locale';
import {getStory, updateStory} from '../db/stories';
import {formatDistance, subDays} from 'date-fns';
import Auth from '../Auth/Auth';
import './Story.css';


class Sentence extends React.Component {



    // upvote a sentence, where val is 1 or -1 (representing the increment)
    upvote(val) {
        const sentence = this.props.sentence;
        const user = localStorage.getItem('username');


        if (!user) {
            // user is unauthenticated so bring up the login page
            this.props.displayLoginBox();

            return;
        }

        if (val === 1) {
            if (sentence.upvotedBy.includes(user)) {
                val = -1;
                sentence.upvotedBy = sentence.upvotedBy.filter((e) => e !== user);
            } else if (sentence.downvotedBy.includes(user)) {
                sentence.downvotedBy = sentence.downvotedBy.filter((e) => e !== user);
            } else {
                sentence.upvotedBy.push(user);
            }
        } else {
            if (sentence.upvotedBy.includes(user)) {
                sentence.upvotedBy = sentence.upvotedBy.filter((e) => e !== user);
            } else if (sentence.downvotedBy.includes(user)) {
                val = 1;
                sentence.downvotedBy = sentence.downvotedBy.filter((e) => e !== user);
            } else {
                sentence.downvotedBy.push(user);
            }
        }

        sentence.upvotes += val;

        // update the database with new sentence upvote count (this is a fake API call)
        this.props.updateSentence(sentence);
    }


    render() {
        const sentence = this.props.sentence;

        return (
            <div className="sentence">
                <div className="upvotes">
                    <button
                        className={`upvoteButton up ${(sentence.upvotedBy.includes(localStorage.getItem('username')) ? ' upvoted' : '')}`}
                        onClick={
                            (e) => {
                                e.stopPropagation();
                                this.upvote.bind(this)(1);
                            }}>
                        <i className="arrow up icon"></i>
                    </button>
                    <div className="value center">{sentence.upvotes}</div>
                    <button
                        className={`upvoteButton down ${(sentence.downvotedBy.includes(localStorage.getItem('username')) ? ' downvoted' : '')}`}
                        onClick={
                            (e) => {
                                e.stopPropagation();
                                this.upvote.bind(this)(-1);
                            }}>
                        <i className="arrow down icon"></i>
                    </button>

                </div>

                <div className="content">
                    <div className="metadata">
                        Written by <a className="author">{sentence.author}</a> <span
                        className="date">{formatDistance(subDays(sentence.dateCreated, 3), new Date())} ago</span>
                    </div>

                        <p>{sentence.text}</p>
                </div>
            </div>
        );
    }
}


class Sentences extends React.Component {
    render() {
        const sentences = this.props.sentences;

        return (
            <div>
                {sentences.length > 0
                    ? sentences.map((sentence) =>
                        <Sentence displayLoginBox={this.props.displayLoginBox}
                                  updateSentence={this.props.updateSentence}
                                  key={sentence.id.toString()} sentence={sentence}/>)
                    : null}
            </div>
        )
    }


}


class StoryIPR extends React.Component {
    constructor(props) {
        super(props);

        // fake API to get this story's data
        const response = getStory({id: parseInt(this.props.match.params.id)});

        // fake API call to get a keyword
        const keyword = 'frog';

        if (response) {
            this.state = {error: false, displayLoginBox: false, story: response, keyword: keyword};
        }

    }

    submit(e) {
        e.preventDefault();

        const user = localStorage.getItem('username');


        // check if user authenticated
        if (!user) {
            this.displayLoginBox();
            return;
        }

        const text = e.target.text.value;

        // check if text contains require keyword
        if (!text.includes(this.state.keyword)) {
            this.setState({error: true});
            return;
        }

        const story = this.state.story;

        story.sentences.push({
            id: story.sentences.length,
            author: user,
            dateCreated: new Date(),
            upvotes: 0,
            text: text,
            upvotedBy: [],
            downvotedBy: [],
        });

        // fake API call to update a story
        const response = updateStory(story);
        if (response) {
            this.setState({story: story});
        }

    }


    // upvote this story
    upvote(val) {
        const story = this.state.story;
        const user = localStorage.getItem('username');


        if (!user) {
            // user is unauthenticated so bring up the login page
            this.displayLoginBox();
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
        // fake API call to update a story
        const response = updateStory(story);

        if (response) {
            this.setState({story: response});
        }
    }


    // update a story's sentence
    updateSentence(sentence) {

        const story = this.state.story;

        for (let i = 0; i > story.sentences.length; i++) {
            if (story.sentences[i].id === sentence.id) {
                story.sentence[i] = sentence;
                break;
            }
        }

        // fake API call to update a story
        const response = updateStory(story);

        if (response) {
            this.setState({story: response});
        }
    }

    displayLoginBox() {

        this.setState(
            {displayLoginBox: true}
        );
    }

    closeLoginBox() {
        this.setState(
            {displayLoginBox: false}
        );
    }


    render() {

        const story = this.state.story;

        return (
            <div id="story" className="page">

                <div className="story">
                    <div className="upvotes">
                        <button
                            className={`upvoteButton up ${(story.upvotedBy.includes(localStorage.getItem('username')) ? ' upvoted' : '')}`}
                            onClick={this.upvote.bind(this, 1)}>
                            <i className="arrow up icon"></i>
                        </button>
                        <div className="value center">{story.upvotes}</div>
                        <button
                            className={`upvoteButton down ${(story.downvotedBy.includes(localStorage.getItem('username')) ? ' downvoted' : '')}`}
                            onClick={this.upvote.bind(this, -1)}>
                            <i className="arrow down icon"></i>
                        </button>

                    </div>

                    <div className="content">
                        <div className="metadata">
                            Created by <a className="author">{story.author}</a> <span
                            className="date">{formatDistance(subDays(story.dateCreated, 3), new Date())}
                            ago</span>


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

                <div className="container-fluid">
                    <div className="row">
                        <div className="offset-lg-3 col-lg-6 col-xs-12">



                                <Sentences sentences={this.state.story.sentences}
                                           updateSentence={this.updateSentence.bind(this)}
                                           displayLoginBox={this.displayLoginBox.bind(this)}/>


                                {story.status === 'IPR' ?
                                    <div className="row textBox">
                                        <div className="col-12">
                                            <h2>Contribute to this story!</h2>

                                            <form className="ui form" onSubmit={this.submit.bind(this)}>
                                                <div className="field">
                                                    <label>Your sentence must include the word <strong
                                                        className="highlight">{this.state.keyword}</strong>.</label>
                                                    <textarea name="text" value={this.state.value}
                                                              onChange={this.change} required>
                                            </textarea>
                                                </div>
                                                <button className="ui teal submit icon button" type="submit">Submit
                                                </button>

                                                {   this.state.error ?
                                                    <div className="ui negative message">
                                                        <div className="header">
                                                            Your sentence must include the word <strong
                                                            className="highlight">{this.state.keyword}</strong>.
                                                        </div>
                                                        <p>Please try again.</p>
                                                    </div>
                                                    : null
                                                }

                                            </form>
                                        </div>


                                    </div>
                                    : null
                                }

                        </div>
                    </div>

                </div>


                {this.state.displayLoginBox ?
                    <Auth hide={this.closeLoginBox.bind(this)}/> :
                    null}

            </div>
        );
    }
}

export default StoryIPR;