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
        const createStoryStatus = createStory(
            {
                title: e.target.title.value,
                description: e.target.description

            });

        if (createStoryStatus) {
            this.setState({storyCreated: true});
        }
    }

    render() {
        return this.state.storyCreated ? <Redirect to="/"/> :
            (<div id="createStory" className="page">
                    <div className="pageTitle">
                        <h1>Create Your Own Story</h1>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="offset-lg-3 col-lg-6 col-xs-12">
                                <form className="ui form" onSubmit={this.createStory.bind(this)}>
                                    <div className="field">
                                        <h2><strong>Title</strong></h2>
                                        <div className="ui input">
                                            <input type="text" name="title" placeholder="Title" required/>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <h2><strong>What is your story about?</strong></h2>
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