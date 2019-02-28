import React, { Component } from 'react';
import { create } from 'domain';

class createStory extends React.Component {
    render(){
        return (
            <div class="container col-lg-6 col-xs-12">

                <form class="ui form">
                <div class="field">
                    <h2><strong>Title</strong></h2>
                    <div class="ui input">
                        <input type="text" name="first-name" placeholder="Title"/>
                    </div>
                </div>

                <div class="field">
                    <h2><strong>Opening Sentence</strong></h2>
                    <h4>Your sentence must include the word <strong class="teal">Frog</strong>.</h4>

                    <textarea placeholder="Write something..." required></textarea>
                </div>


                <button class="ui teal button" type="submit">Create Story</button>

                </form>
            </div>
        );
    }
}

export default createStory;