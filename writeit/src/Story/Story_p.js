import React, { Component } from 'react';
import { create } from 'domain';

class addSentence extends React.Component {
    render(){
        return (
            <div class="container col-lg-6 col-xs-12">
            <h2>Your sentence must include the word <strong class="teal">Frog</strong>.</h2>
            <form class="ui reply form">
            <div class="field">
                <textarea placeholder="Write something..."></textarea>
            </div>
            <div class="ui teal labeled submit icon button">
                <i class="icon edit"></i> Add Sentence
            </div>
            </form>
            </div>
        );
    }
}