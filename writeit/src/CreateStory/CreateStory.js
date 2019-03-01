import React from 'react';

class createStory extends React.Component {
    /*submit(){

    }*/
    render(){
        return (
            <div className="createStory">
                <form className="storyForm">
                    <div className="title">
                        <h2><strong>Title</strong></h2>
                        <input type="text" name="first-name" placeholder="Title"/>
                    </div>

                    <div className="context">
                        <h2><strong>What is this story about?</strong></h2>
                        <textarea placeholder="Write something..." required></textarea>
                    </div>

                    <button id="newStory" /*onClick={submit}*/>Create Story</button>
                </form>
            </div>


        );
    }
}

export default createStory;