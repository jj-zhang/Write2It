import React from 'react';
import {createStory} from '../db/stories';
import {Redirect} from 'react-router';


class CreateStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {storyCreated: false};
    }

    // create a new story
    createStory(e) {
        e.preventDefault();

        // fake API call to create a new story
        const response = createStory(
            {
                title: e.target.title.value,
                description: e.target.description.value
            });

        if (response) {
            this.setState({storyCreated: true, story: response});
        }
    }

    render() {
        return this.state.storyCreated ? <Redirect to={`../story/${this.state.story.id}`}/> :
            (<div id="createStory" className="page">
                    <div className="pageTitle shadow">
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
                                        <textarea name="description" placeholder="Write something..."
                                                  required></textarea>
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