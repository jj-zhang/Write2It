import React from 'react';
import {deleteStory, getStory, updateStory} from '../db/stories';
import {formatDistance, subDays} from 'date-fns';
import Auth from '../Auth/Auth';
import './Story.css';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class Sentence extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayEditBox: false,
            error: false,
            sentence: this.props.sentence
        };
    }

    // upvote a sentence, where val is 1 or -1 (representing the increment)
    upvote(val) {
        const sentence = this.state.sentence;
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

        // fake API call to update the database with new sentence upvote count
        this.props.updateSentence(sentence, false);
    }


    // toggle the edit box to edit sentences
    toggleEditBox(e) {
        e.preventDefault();

        this.setState({displayEditBox: !this.state.displayEditBox});
    }

    // listen to changes to state variables in the edit box form
    change(e) {
        e.preventDefault();

        const sentence = this.state.sentence;
        // if (sentence.text.includes(sentence.keyword)) {
            sentence[e.target.name] = e.target.value;
            this.setState({sentence: sentence});
        // }
    }

    // edit a sentence
    saveEdit(e) {
        e.preventDefault();

        const sentence = this.state.sentence;



        if (sentence.text.includes(sentence.keyword)) {
            sentence[e.target.name] = e.target.value;

            // fake API call to update the database with new sentence
            this.props.updateSentence(sentence, true);

            this.setState({displayEditBox: false});


        } else {
            this.setState({error: true, sentence: this.props.sentence});
        }

    }

    // delete a sentence
    deleteSentence(e) {
        e.preventDefault();

        const sentence = this.state.sentence;
        sentence.delete = true;

        // fake API call to update the database with new sentence
        this.props.updateSentence(sentence, true);
    }

    render() {
        const sentence = this.state.sentence;

        const user = localStorage.getItem('username');
        const userType = localStorage.getItem('loginStatus');

        const canEdit = sentence.author === user || userType === 'admin';
        const canDelete = userType === 'admin';

        // format sentence
        const _temp = sentence.text.split(sentence.keyword);
        let formattedText = _temp.map((s, index) => <span key={index}>{s}<strong className="highlight">{sentence.keyword}</strong></span>);
        formattedText.splice(-1);
        formattedText.push(<span key={_temp.length - 1}>{_temp[_temp.length - 1]}</span>);

        formattedText = <p>{formattedText}</p>;

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

                {this.state.displayEditBox ?
                    (
                        <div className="editBox">
                            <form className="ui form" onSubmit={this.saveEdit.bind(this)}>
                                <div className="field">
                                    <label>Your sentence must include the word <strong
                                        className="highlight">{sentence.keyword}</strong>.</label>
                                    <textarea name="text" value={sentence.text} onChange={this.change.bind(this)}
                                              required>
                                                </textarea>
                                </div>

                                <button className="ui red icon button"
                                        onClick={this.deleteSentence.bind(this)}>Delete
                                </button>
                                <button className="ui teal submit icon button" type="submit">Save
                                </button>

                                {this.state.error &&
                                <div className="ui negative message">
                                    <div className="header">
                                        Your sentence must include the word <strong
                                        className="highlight">{sentence.keyword}</strong>.
                                    </div>
                                    <p>Please try again.</p>
                                </div>}
                            </form>


                        </div>

                    ) : (
                        <div className="content">
                            <div className="metadata">
                                Written by <Link className="author" to={`/profile/${sentence.author}`}>{sentence.author}</Link> <span
                                className="date">{formatDistance(subDays(sentence.dateCreated, 0), new Date())}
                                ago</span>
                                {canEdit &&
                                <button className="editButton" onClick={this.toggleEditBox.bind(this)}>
                                    <i className="edit icon"></i>
                                    Edit
                                </button>
                                }
                            </div>
                            {formattedText}
                        </div>

                    )
                }
            </div>
        );
    }
}


class Sentences extends React.Component {
    render() {
        const sentences = this.props.sentences;

        const temp =  sentences.length > 0
            && sentences.map((sentence) =>
                <Sentence key={sentence.id.toString()} displayLoginBox={this.props.displayLoginBox}
                          updateSentence={this.props.updateSentence}
                          sentence={sentence}/>);

        return (
            <div>
                {temp}
            </div>

        );

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
            this.state = {
                error: false,
                displayEditBox: false,
                goToLanding: false,
                displaySavingChanges: false,
                displayLoginBox: false,
                story: response,
                keyword: keyword
            };
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
            id: story.sentences.length > 0 ? story.sentences[story.sentences.length - 1].id + 1 : 10,
            author: user,
            dateCreated: new Date(),
            upvotes: 0,
            text: text,
            upvotedBy: [],
            downvotedBy: [],
            keyword: this.state.keyword
        });

        // fake API call to update a story
        const response = updateStory(story);
        if (response) {
            this.setState({story: story, error: false});
            e.target.text.value = '';
        }

    }

    // toggle the edit box to edit stories
    toggleEditBox(e) {
        e.preventDefault();

        this.setState({displayEditBox: !this.state.displayEditBox});
    }

    // listen to changes to state variables in the edit box form
    change(e) {
        e.preventDefault();

        const story = this.state.story;

        story[e.target.name] = e.target.value;

        this.setState({story: story});
    }

    // edit a story
    saveEdit(e) {
        e.preventDefault();

        const story = this.state.story;
        //
        // story.title = e.target.title.value;
        // story.description = e.target.description.value;

        // update the database with new story upvote count (this is a fake API call)
        // fake API call to update a story
        const response = updateStory(story);
        if (!response) {
            return;
        }

        this.setState({displaySavingChanges: true, displayEditBox: false});
        const _self = this;
        setTimeout(() => _self.setState({displaySavingChanges: false, story: response}), 1000);
    }

    // delete a story
    deleteStory(e) {
        e.preventDefault();

        // fake API call to delete a story
        const response = deleteStory({id: this.state.story.id});
        if (!response) {
            return;
        }

        this.setState({displayEditBox: false, displaySavingChanges: true});
        const _self = this;
        setTimeout(() => _self.setState({goToLanding: true}), 1000);
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
    updateSentence(sentence, showConfirm) {

        const story = this.state.story;

        if (sentence.delete) { // delete sentence
            story.sentences =
                story.sentences.filter((_sentence) => _sentence.id !== sentence.id);
        } else { // change sentence
            for (let i = 0; i > story.sentences.length; i++) {
                if (story.sentences[i].id === sentence.id) {
                    story.sentence[i] = sentence;
                    break;
                }
            }
        }


        // fake API call to update a story
        const response = updateStory(story);

        if (response) {
            this.setState({story: response});
        }

        if (showConfirm) {
            this.setState({displaySavingChanges: true});
            const _self = this;
            setTimeout(() => _self.setState({displaySavingChanges: false, story: response}), 1000);
        }

    }

    // display the login box
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
        const story = this.state.story;
        const user = localStorage.getItem('username');
        const userType = localStorage.getItem('loginStatus');

        const canEdit = story.author === user || userType === 'admin';
        // const canDelete = userType === 'admin';

        return this.state.goToLanding ? <Redirect to="/"/> : (
            <div id="story" className="page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9 col-xs">

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


                                { this.state.displayEditBox ?
                                    <div className="col-12">
                                        <div className="editBox">

                                            <form className="ui form" onSubmit={this.saveEdit.bind(this)}>

                                                <div className="field">
                                                    <label>Title</label>
                                                    <input type="text" name="title" value={this.state.story.title}
                                                           onChange={this.change.bind(this)} required>
                                                    </input>
                                                </div>

                                                <div className="field">
                                                    <label>What is your story about?</label>
                                                    <textarea name="description"
                                                              value={this.state.story.description}
                                                              onChange={this.change.bind(this)} required>
                                                    </textarea>
                                                </div>

                                                <button className="ui red icon button"
                                                        onClick={this.deleteStory.bind(this)}>Delete
                                                </button>
                                                <button className="ui teal submit icon button" type="submit">Save
                                                </button>

                                            </form>
                                        </div>

                                    </div>
                                    :

                                    <div className="content">
                                        <div className="metadata">
                                            Created by <Link className="author" to={`/profile/${story.author}`} >{story.author}</Link> <span
                                            className="date">{formatDistance(subDays(story.dateCreated, 3), new Date())}
                                            ago</span>
                                            {/*{story.status === 'IPR' ?*/}
                                                {/*<span className="status inprogress"> (in progress)</span>*/}
                                                {/*:*/}
                                                {/*<span className="status"> (completed)</span>*/}
                                            {/*}*/}

                                            {canEdit &&
                                            <button className="editButton" onClick={this.toggleEditBox.bind(this)}>
                                                <i className="edit icon"></i>
                                                Edit
                                            </button>
                                            }

                                        </div>


                                        <h1 className="storyTitle">{story.title}</h1>
                                        <p className="text">{story.description}</p>
                                    </div>

                                }


                            </div>

                            <Sentences sentences={this.state.story.sentences}
                                       updateSentence={this.updateSentence.bind(this)}
                                       displayLoginBox={this.displayLoginBox.bind(this)}/>

                            {story.status === 'IPR' &&
                            <div className="row textBox">
                                <div className="col-12">
                                    <h2>Contribute to this story!</h2>

                                    <form className="ui form" onSubmit={this.submit.bind(this)}>
                                        <div className="field">
                                            <label>Your sentence must include the word <strong
                                                className="highlight">{this.state.keyword}</strong>.</label>
                                            <textarea name="text" placeholder="Write something..."
                                                      required>
                                                </textarea>
                                        </div>
                                        <button className="ui teal submit icon button" type="submit">Submit
                                        </button>

                                        {this.state.error &&
                                        <div className="ui negative message">
                                            <div className="header">
                                                Your sentence must include the word <strong
                                                className="highlight">{this.state.keyword}</strong>.
                                            </div>
                                            <p>Please try again.</p>
                                        </div>
                                        }
                                    </form>
                                </div>
                            </div>
                            }

                        </div>
                    </div>
                </div>


                {this.state.displayLoginBox &&
                <Auth hide={this.closeLoginBox.bind(this)}/>
                }

                {this.state.displaySavingChanges &&
                <div className="savingChangesMessage ui teal message">
                    <div className="header">
                        Success
                    </div>
                    <p>Your changes have been saved.</p>
                </div>
                }

            </div>
        );
    }
}

export default StoryIPR;