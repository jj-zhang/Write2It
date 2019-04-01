import React from 'react';
import {createStory} from '../db/stories';
import {Redirect} from 'react-router';
import {authmiddleware} from '../Session/AuthSession';
// react component to render the create story view
/*
This is used for creating a story. 
The user can create a story here(must fill the title and what is the story about).
After clicking the "create story" button, the users will get a story in progress page 
created from the user's input
*/
class CreateStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {storyCreated: false};
    }

    // create a new story
    createStory=(e)=> {
        e.preventDefault();
        const data = {
            title: e.target.title.value,
            description: e.target.description.value
        }
        const request = new Request("/story", {
            method: 'post', 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
                console.log("triggered")
                console.log(res);
                window.location.href="/story/"+res._id;
            }
        )




    }

    render() {
        return this.state.storyCreated ? <Redirect to={`../story/${this.state.story.id}`}/> :
            (
                <div id="createStory" className="page">
                    <div className="pageTitle">
                        <h1>Create A Story</h1>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-xs-12">
                                <form className="ui form" onSubmit={this.createStory.bind(this)}>
                                    <div className="field">
                                        <label>Title</label>
                                        <div className="ui input">
                                            <input type="text" name="title" placeholder="Title" required/>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label>What is your story about?</label>
                                        <textarea name="description" placeholder="Write something..." required/>
                                    </div>

                                    <button className="ui teal button" type="submit">Create
                                        Story
                                    </button>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            );
    }
}

export default CreateStory;