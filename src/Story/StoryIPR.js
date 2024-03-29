import React from 'react';
import {formatDistance, subDays} from 'date-fns';
import Auth from '../Auth/Auth';
import './Story.css';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Filereport from '../FileReport/FileReport';
import randomWords from 'random-words';
import {authmiddleware} from '../Session/AuthSession';

// functions that making api calls for update upvotes of sentences & stories
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
            if (res.status === 200){
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
            if (res.status === 200){
                window.location.reload();
            }else{
                console.log(res);
            }
        }
    )

}
const deleteStoryUpvote = (storyid, upvote)=>{
    const request = new Request("/upvote/"+storyid+'/'+upvote, {
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
            if (res.status === 200){
                window.location.reload();
            }else{
                console.log(res);
            }
        }
    )
}
const deleteSentenceUpvote = (storyid, sentenceid, upvote)=>{
    const request = new Request("/upvote/"+storyid+"/"+sentenceid+"/"+upvote, {
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
            if (res.status === 200){
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

    // functions controlling displaying/not the report box
    closeReportBox = () =>{
        this.setState({displayReportPage:false});
    }

    displayReportPage = () =>{
        this.setState({displayReportPage:true});
    }

    // upvote this sentence, where val is 1 or -1 (representing the increment or decrement)
    // if the user already increment/decrement, remove the old update
    upvote(val) {
        const sentence = this.state.sentence;
        const userid = localStorage.getItem('userid');
        if (!userid) {
            // user is unauthenticated so bring up the login page
            this.props.displayLoginBox();
            return;
        }
        if (val === 1) {
            // if the sentence has already been incremented, delete the upvote
            if (sentence.upvotedBy.includes(userid)) {
                deleteSentenceUpvote(this.props.storyid, sentence.id, 1);
            // if the sentence has already been decremented by user, cancel the decrement
            } else if (sentence.downvotedBy.includes(userid)) {
                deleteSentenceUpvote(this.props.storyid, sentence.id, -1);
            // otherwise add a postive upvote 
            } else {
                sendSentenceUpvote(this.props.storyid, sentence.id, 1);
            }
        } else {
            // if the sentence is already incremented, remove the incrementation
            if (sentence.upvotedBy.includes(userid)) {
                deleteSentenceUpvote(this.props.storyid, sentence.id, 1);
            // if the sentence is already decremented, remove the decrementation
            } else if (sentence.downvotedBy.includes(userid)) {
                deleteSentenceUpvote(this.props.storyid, sentence.id, -1);
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
            sentence[e.target.name] = e.target.value;
            this.setState({sentence: sentence});

    }

    // send the edited sentence to server
    saveEdit(e) {
        e.preventDefault();

        const sentence = this.state.sentence;

        if (sentence.text.toLowerCase().includes(sentence.keyword)) {
            const request = new Request("/updateSentence/"+this.props.storyid+'/'+sentence.id, {
                method: 'put', 
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
                    if (res.status === 200){
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

    // delete notify the server to delete this sentence
    deleteSentence(e) {
        e.preventDefault();

        const sentenceid = this.state.sentence.id;
        const storyid = this.props.storyid;
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
            if (res.status ===200){
                window.location.reload();
            }
        })
    }

    render() {

        // data for render
        const sentence = this.state.sentence;
        const user = localStorage.getItem('username');
        const userType = localStorage.getItem('loginStatus');
        const canEdit = sentence.author === user || userType === 'admin';

        // format sentence to display
        
        const keywordReg =  new RegExp(sentence.keyword, "gi");
        let keywordarray = sentence.text.match(keywordReg);
        if (keywordarray == null){
            keywordarray = [];
        }
        keywordarray.push("placeholder");
        const _temp = sentence.text.split(keywordReg);
        let formattedText = _temp.map((s, index) => <span key={index}>{s}<strong className="highlight">{keywordarray[index]}</strong></span>);
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
                                className="date"> {formatDistance(subDays(sentence.dateCreated, 0), new Date())} ago </span>
                                {sentence.chosen? <strong className="chosen"> &nbsp; Chosen &nbsp; </strong>:<strong className="candidate"> &nbsp; Candidate &nbsp; </strong>}
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
                                <Filereport user={sentence.author} sentence={formattedText} hide={this.closeReportBox} storyid={this.props.storyid} sentenceid={sentence.id}/>:null}
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
        // maps the sentences in story to sentence displays, note that story id is also passed in
        const sentences = this.props.sentences;
        const temp =  sentences.length > 0
            && sentences.map((sentence) =>
                <Sentence key={sentence.id.toString()} displayLoginBox={this.props.displayLoginBox}
                          storyid={this.props.storyid} sentence={sentence}/>);
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

        // placehoder to prevent error on page load but not fetching data yet
        const placehoder = {
            id: 0,
            title: '',
            author: '', 
            dateCreated: new Date(),
            upvotes: 0,
            status: 'IPR',
            description: '',
            upvotedBy: [],
            downvotedBy: [],
            sentences: []
        }

        // generate a keyword for next sentence
        const keyword = randomWords();

        // set the states
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

    // fetch data from database for rendering the corresponding story
    componentDidMount(){
        const request = new Request("/oneStory/" + this.props.match.params.id, {
            method: 'get', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
        .then(
            (res)=>{
                if (res.status !== 200){
                    alert("woops! error code:"+res.status);
                }else{
                    return res.json()
                }

            }
        ).then(
            (res)=>{
                // parse the response into story state previously designed for the page in phase1
                // after parsing everythin works the same as phase1 except that upvote arrays now holds
                // userids instead of user names
                const response = {
                    id: res._id,
                    title: res.title,
                    author: res.author.name,
                    dateCreated: new Date(res.timeCreated),
                    upvotes: res.upvoteCount,
                    status: 'IPR',
                    description: res.description,
                    upvotedBy: res.upvotes.filter(
                        voteobject=>voteobject.vote ===1
                    ).map(
                        voteobject=>voteobject.user._id
                    ),
                    downvotedBy: res.upvotes.filter(
                        voteobject=>voteobject.vote ===-1
                    ).map(
                        voteobject=>voteobject.user._id
                    ),
                    // parsing each sentence object
                    sentences: res.sentences.map(
                        (sentence)=>{
                            return {
                                id:sentence._id,
                                author:sentence.author.name,
                                dateCreated: new Date(sentence.dateModified),
                                upvotes:sentence.upvoteCount,
                                upvotedBy: sentence.upvotes.filter(
                                        voteobject=>voteobject.vote ===1
                                    ).map(
                                        voteobject=>voteobject.user
                                    ),
                                downvotedBy: sentence.upvotes.filter(
                                        voteobject=>voteobject.vote ===-1
                                    ).map(
                                        voteobject=>voteobject.user
                                    ),
                                keyword:sentence.keyword,
                                text:sentence.content,
                                chosen:sentence.chosen
                            }
                        }
                    )
                }
                this.setState({story: response});
            }
        )
    }

    // submit the new sentence to server
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
        if (!text.toLowerCase().includes(this.state.keyword)) {
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
            if(res.status===200){
                window.location.reload();
            }
        })
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

    // send the edited storytitle/description to server
    saveEdit(e) {
        e.preventDefault();
        const story = this.state.story;
        const request = new Request("/storys/" + story.id, {
            method: 'put', 
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
                if (res.status === 200){
                    window.location.reload();
                }else{
                    console.log(res);
                }
            }
        )
    }

    // tell the server to delete the story
    deleteStory(e) {
        e.preventDefault();
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
            if (res.status!==200){
                console.log(res.status);
            }else{
                window.location.href="/";
            }
        })
    }

    // handles when upvote button is clicked
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
                deleteStoryUpvote(story.id, 1);
            } else if (story.downvotedBy.includes(userid)) {
                // remove downvote
                deleteStoryUpvote(story.id, -1);
            } else {
                sendStoryUpvote(story.id, 1);
            }
        } else {
            if (story.upvotedBy.includes(userid)) {
                deleteStoryUpvote(story.id, 1);
            } else if (story.downvotedBy.includes(userid)) {
               deleteStoryUpvote(story.id, -1);
            } else {
                sendStoryUpvote(story.id, -1);
            }
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
        // data for rendering the page
        const story = this.state.story;
        const user = localStorage.getItem('username');
        const userType = localStorage.getItem('loginStatus');
        const canEdit = story.author === user || userType === 'admin';
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
                            {/* passed in the story ids */}
                            <Sentences sentences={this.state.story.sentences}
                                       displayLoginBox={this.displayLoginBox.bind(this)}
                                       storyid={this.state.story.id}
                                       />
                            {story.status === 'IPR' &&
                                <div className="row textBox">
                                    <div className="col-12">
                                        <h2>Contribute to this story!</h2>
                                        <form className="ui form" onSubmit={this.submit.bind(this)}>
                                            <div className="field">
                                                <label>Your sentence must include "<strong
                                                    className="highlight">{this.state.keyword}</strong>".</label>
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