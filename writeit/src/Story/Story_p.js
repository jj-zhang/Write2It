import React from 'react';

class addSentence extends React.Component {
    /*submit(){

    }*/
    render(){
        return (
            <div>
            <h2>Your sentence must include the word <strong className="keyWord">Frog</strong>.</h2>
            <form>
            <textarea placeholder="Write something..."></textarea>
            <button id="addSentence" /*onClick={submit}*/>Add Sentence</button>
            </form>
            </div>
        );
    }
}