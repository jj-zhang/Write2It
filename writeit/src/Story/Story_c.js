import React from 'react';
import stories from '../db/stories';

class Story extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const story = this.props.story;

        return (
            <div>
            Created by{story.author}
            <h1>{story.title}</h1>
            <p>111</p>
            </div>
        );
    }
}

class Stories extends React.Component {
    render() {
        const stories = this.props.stories;

        const items =  stories.map((story) =>
            <Story key={story.id} story={story} />
        );


        return (
            <div>{items}</div>
        );
    }
}

class Story_c extends React.Component {
    constructor(props) {
        super(props);

        this.state = {stories: stories};
    }
    render(){
        return (
            <div>
            <Stories stories={this.state.stories}/>
            <div class="container col-lg-6 col-xs-12">
                <form class="ui reply form">
                <div class="field">
                    <textarea></textarea>
                </div>
                <div class="ui teal labeled submit icon button">
                <i class="icon edit"></i> Add Sentence
                </div>
                </form>
            </div>
            </div>
        );
    }
}

export default Story_c;