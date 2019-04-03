'use strict';

import React from 'react';
import {deleteStory, getStory, updateStory} from '../db/stories';
import {formatDistance, subDays} from 'date-fns';
import Auth from '../Auth/Auth';
import './Story.css';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Filereport from '../FileReport/FileReport';
import randomWords from 'random-words';
import {authmiddleware} from '../Session/AuthSession';


const sendStoryUpvote = (storyid,vote)=>{
    const request = new Request("/upvote/"+storyid, {
        method: 'post', 
        body: JSON.stringify({vote:vote}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    fetch(request).then(
        res=>{
            return authmiddleware(res);
        }
    ).then(
        res=>{
            if (res.status == 200){
                window.location.reload();
            }else{
                console.log(res);
            }
        }
    )
}
const sendSentenceUpvote = (storyid, sentenceid, vote)=>{
    const request = new Request("/upvote/"+storyid+'/'+sentenceid, {
        method: 'post', 
        body: JSON.stringify({vote:vote}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    fetch(request).then(
        res=>{
            return authmiddleware(res);
        }
    ).then(
        res=>{
            if (res.status == 200){
                window.location.reload();
            }else{
                console.log(res);
            }
        }
    )

}
const deleteStoryUpvote = (storyid, userid, upvote)=>{
    const request = new Request("/upvote/"+storyid+'/'+userid+'/'+upvote, {
        method: 'delete', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    fetch(request).then(
        res=>{
            return authmiddleware(res);
        }
    ).then(
        res=>{
            if (res.status == 200){
                window.location.reload();
            }else{
                console.log(res);
            }
        }
    )
}
const deleteSentenceUpvote = (storyid, sentenceid, userid, upvote)=>{
    const request = new Request("/upvote/"+storyid+"/"+sentenceid+"/"+userid+"/"+upvote, {
        method: 'delete', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    fetch(request).then(
        res=>{
            return authmiddleware(res);
        }
    ).then(
        res=>{
            if (res.status == 200){
                window.location.reload();
            }else{
                console.log(res);
            }
        }
    )
}









// a component to render a story's sentence
/*
This is used for story in progress. 
The user can continue the story by posting their ideas(need to include the keyword), 
upvote or downvote other users' post. The admin can also delete the story.
*/
class Sentence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayEditBox: false,
            error: false,
            sentence: this.props.sentence,
            displayReportPage: false
        };
    }

    closeReportBox = () =>{
        this.setState({displayReportPage:false});
    }

    displayReportPage = () =>{
        this.setState({displayReportPage:true});
    }

    // upvote a sentence, where val is 1 or -1 (representing the increment)
    upvote(val) {
        const sentence = this.state.sentence;
        const userid = localStorage.getItem('userid');
        if (!userid) {
            // user is unauthenticated so bring up the login page
            this.props.displayLoginBox();
            return;
        }
        if (val === 1) {
            // if the sentence has already been incremented, do nothing
            if (sentence.upvotedBy.includes(userid)) {
            // if the sentence has already been decremented by user, cancel the decrement
            } else if (sentence.downvotedBy.includes(userid)) {
                deleteSentenceUpvote(this.props.storyid, sentence.id, userid, -1);
            // otherwise add a postive upvote 
            } else {
                sendSentenceUpvote(this.props.storyid, sentence.id, 1);
            }
        } else {
            // if the sentence is already incremented, remove the incrementation
            if (sentence.upvotedBy.includes(userid)) {
                deleteSentenceUpvote(this.props.storyid, sentence.id, userid, 1);
            // if the sentence is already decremented, do nothing
            } else if (sentence.downvotedBy.includes(userid)) {
            // otherwise add a negative upvote
            } else {
                sendSentenceUpvote(this.props.storyid, sentence.id, -1);
            }
        }
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
            // sentence[e.target.name] = e.target.value;
            // // fake API call to update the database with new sentence
            // this.props.updateSentence(sentence, true);
            const request = new Request("/updatesentence/"+this.props.storyid+'/'+sentence.id, {
                method: 'post', 
                body: JSON.stringify({content:sentence.text}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            fetch(request).then(
                res=>{
                    return authmiddleware(res);
                }
            ).then(
                res=>{
                    if (res.status == 200){
                        window.location.reload();
                    }else{
                        console.log(res);
                    }
                }
            )

        } else {
            this.setState({error: true, sentence: this.props.sentence});
        }

    }

    // delete a sentence
    deleteSentence(e) {
        e.preventDefault();

        // const sentence = this.state.sentence;
        // sentence.delete = true;

        // // fake API call to update the database with new sentence
        // this.props.updateSentence(sentence, true);
        const sentenceid = this.state.sentence.id;
        const storyid = this.props.storyid;
        console.log("sentence with"+sentenceid+"story"+storyid+"deleted");
        const request = new Request("/sentences/"+storyid+'/'+sentenceid, {
            method: 'delete', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
        .then(res=>authmiddleware(res))
        .then(res=>{
            if (res.status ==200){
                window.location.reload();
            }
        })
    }

    render() {
        const sentence = this.state.sentence;

        const user = localStorage.getItem('username');
        const userType = localStorage.getItem('loginStatus');

        const canEdit = sentence.author === user || userType === 'admin';
        // const canDelete = userType === 'admin';

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
                        className={`upvoteButton up ${(sentence.upvotedBy.includes(localStorage.getItem('userid')) ? ' upvoted' : '')}`}
                        onClick={
                            (e) => {
                                e.stopPropagation();
                                this.upvote.bind(this)(1);
                            }}>
                        <i className="arrow up icon"></i>
                    </button>
                    <div className="value center">{sentence.upvotes}</div>
                    <button
                        className={`upvoteButton down ${(sentence.downvotedBy.includes(localStorage.getItem('userid')) ? ' downvoted' : '')}`}
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
                                Written by <Link className="author" to={`/profile/${sentence.author}`}>{sentence.author}</Link><span
                                className="date"> {formatDistance(subDays(sentence.dateCreated, 0), new Date())} ago</span>

                                <div className="buttonGroup">

                                    {canEdit &&
                                    <button className="editButton" onClick={this.toggleEditBox.bind(this)}>
                                        <i className="edit icon"></i>
                                        Edit
                                    </button>
                                    }
                                    {(userType === 'admin' || userType === 'user') &&
                                        <button className="editButton" onClick={this.displayReportPage}>
                                            <i className="exclamation circle icon"></i>
                                            Report
                                        </button>
                                    }

                                </div>

                                {this.state.displayReportPage?
                                <Filereport user={sentence.user} sentence={formattedText} hide={this.closeReportBox} id={sentence.id}/>:null}
                            </div>
                            {formattedText}
                        </div>

                    )
                }
            </div>
        );
    }
}

// component to wrap a story's sentences
class Sentences extends React.Component {
    render() {
        const sentences = this.props.sentences;

        const temp =  sentences.length > 0
            && sentences.map((sentence) =>
                <Sentence key={sentence.id.toString()} displayLoginBox={this.props.displayLoginBox}
                          updateSentence={this.props.updateSentence } storyid={this.props.storyid}
                          sentence={sentence}/>);
        return (
            <div>
                {temp}
            </div>
        );

    }
}

// component to render the story view
class StoryIPR extends React.Component {
    constructor(props) {
        super(props);

        // placehoder to prevent error 
        const placehoder = {
            id: 0,
            title: '',
            author: '', // change to userid later
            dateCreated: new Date(),
            upvotes: 0,
            status: 'IPR',
            description: '',
            upvotedBy: [],
            downvotedBy: [],
            sentences: []
        }

        // fake API call to get a keyword
        const keyword = randomWords();

        this.state = {
            error: false,
            displayEditBox: false,
            goToLanding: false,
            displaySavingChanges: false,
            displayLoginBox: false,
            story: placehoder,
            keyword: keyword
        };
    }

    // fetch data from database and render the corresponding story
    componentDidMount(){
        const request = new Request("/storyss/"+this.props.match.params.id, {
            method: 'get', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
        .then(
            (res)=>{
                if (res.status != 200){
                    alert("woops! error code:"+res.status);
                }else{
                    return res.json()
                }

            }
        ).then(
            (res)=>{
                // parse the response into story state previously designed for the page
                const response = {
                    id: res._id,
                    title: res.title,
                    author: res.author.name,
                    dateCreated: new Date(res.timeCreated),
                    upvotes: res.upvoteCount,
                    status: 'IPR',
                    description: res.description,
                    upvotedBy: res.upvotes.filter(
                        voteobject=>voteobject.vote ==1
                    ).map(
                        voteobject=>voteobject.user._id
                    ),
                    downvotedBy: res.upvotes.filter(
                        voteobject=>voteobject.vote ==-1
                    ).map(
                        voteobject=>voteobject.user._id
                    ),
                    sentences: res.sentences.map(
                        (sentence)=>{
                            return {
                                id:sentence._id,
                                author:sentence.author.name,
                                dateCreated: new Date(sentence.dateModified),
                                upvotes:sentence.upvoteCount,
                                upvotedBy: sentence.upvotes.filter(
                                        voteobject=>voteobject.vote ==1
                                    ).map(
                                        voteobject=>voteobject.user
                                    ),
                                downvotedBy: sentence.upvotes.filter(
                                        voteobject=>voteobject.vote ==-1
                                    ).map(
                                        voteobject=>voteobject.user
                                    ),
                                keyword:sentence.keyword,
                                text:sentence.content
                            }
                        }
                    )
                }
                this.setState({story: response});
            }
        )
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
        const request = new Request("/sentences/"+ story.id, {
            method: 'post', 
            body: JSON.stringify({
                content: text,
                keyword: this.state.keyword
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        fetch(request)
        .then(res=> authmiddleware(res))
        .then(res=>{
            // on success refreshes the page
            if(res.status==200){
                window.location.reload();
            }
        })




        // story.sentences.push({
        //     id: story.sentences.length > 0 ? story.sentences[story.sentences.length - 1].id + 1 : 10,
        //     author: user,
        //     dateCreated: new Date(),
        //     upvotes: 0,
        //     text: text,
        //     upvotedBy: [],
        //     downvotedBy: [],
        //     keyword: this.state.keyword
        // });

        // // fake API call to update a story
        // const response = updateStory(story);
        // if (response) {
        //     this.setState({story: story, error: false});
        //     e.target.text.value = '';
        // }

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
        console.log("request.send")
        const story = this.state.story;
        const request = new Request("/updatestory/" + story.id, {
            method: 'post', 
            body: JSON.stringify({
                title:story.title,
                description:story.description
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then(
            res=>{
                return authmiddleware(res);
            }
        ).then(
            res=>{
                if (res.status == 200){
                    window.location.reload();
                }else{
                    console.log(res);
                }
            }
        )

        // update the database with new story upvote count (this is a fake API call)
        // fake API call to update a story
        // const response = updateStory(story);
        // if (!response) {
        //     return;
        // }

        
        // const _self = this;
        // setTimeout(() => _self.setState({displaySavingChanges: false, story: response}), 1000);
        // this.setState({displaySavingChanges: true, displayEditBox: false});
    }

    // delete a story
    deleteStory(e) {
        e.preventDefault();
        console.log("delete story request:"+this.state.story.id);
        const request = new Request("/storys/"+this.state.story.id, {
            method: 'delete', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        fetch(request)
        .then(res=> authmiddleware(res))
        .then(res=>{
            if (res.status!=200){
                console.log(res.status);
            }else{
                window.location.href="/";
            }
        })
    }

    // upvote this story
    upvote(val) {
        const story = this.state.story;
        const userid = localStorage.getItem('userid');
        if (!userid) {
            // user is unauthenticated so bring up the login page
            this.displayLoginBox();
            return;
        }

        if (val === 1) {
            if (story.upvotedBy.includes(userid)) {
                // donothing if already upvoted
            } else if (story.downvotedBy.includes(userid)) {
                // remove downvote
                deleteStoryUpvote(story.id,userid,-1);
            } else {
                sendStoryUpvote(story.id, 1);
            }
        } else {
            if (story.upvotedBy.includes(userid)) {
                deleteStoryUpvote(story.id, userid, 1);
            } else if (story.downvotedBy.includes(userid)) {
               // do nothing if already downvoted
            } else {
                sendStoryUpvote(story.id, -1);
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
        this.setState({displayLoginBox: true});
    }

    // close the loginbox
    closeLoginBox() {
        this.setState({displayLoginBox: false});
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

                            <div className="story shadow">
                                <div className="upvotes">
                                    <button
                                        className={`upvoteButton up ${(story.upvotedBy.includes(localStorage.getItem('userid')) ? ' upvoted' : '')}`}
                                        onClick={this.upvote.bind(this, 1)}>
                                        <i className="arrow up icon"></i>
                                    </button>
                                    <div className="value center">{story.upvotes}</div>
                                    <button
                                        className={`upvoteButton down ${(story.downvotedBy.includes(localStorage.getItem('userid')) ? ' downvoted' : '')}`}
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
                                                {userType === "admin"?
                                                <button className="ui red icon button"
                                                        onClick={this.deleteStory.bind(this)}>Delete
                                                </button>:null}
                                                <button className="ui teal submit icon button" type="submit">Save
                                                </button>

                                            </form>
                                        </div>
                                    </div>
                                    :
                                    <div className="content">
                                        <div className="metadata">
                                            Created by <Link className="author" to={`/profile/${story.author}`} >{story.author}</Link> <span
                                            className="date">{formatDistance(subDays(story.dateCreated, 0), new Date())} ago</span>
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
                                       displayLoginBox={this.displayLoginBox.bind(this)}
                                       storyid={this.state.story.id}
                                       />

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
                {this.state.displayLoginBox && <Auth hide={this.closeLoginBox.bind(this)}/>}
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