import React from 'react';

class StoryIPR extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sentences: [
                {id:0, user:'a', content:'She needed help.',vote:22}
            ],
            value:''
        }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.upvote = this.upvote.bind(this);
    }

    change(e){
        e.persist();

        this.setState(prevState => {
            return{
                sentences: prevState.sentences,
                value: e.target.value
            }
        })
    }
    
    submit(e){
        e.preventDefault();
        const l = this.state.sentences.length;
        this.state.sentences.push({id:l,user:'a',content:this.state.value, vote:0});
        this.setState(prevState => {
            return{
                sentences: prevState.sentences,
                value: ''
            }
        })
    }

    upvote(e, n){
        e.persist();
        for(let i=0;i<this.state.sentences.length;i++){
            if(this.state.sentences[i].id == n){
                this.state.sentences[i].vote += 1;
            }
        }
        this.setState(prevState => {
            return{
                sentences: prevState.sentences,
                value: prevState.value
            }
        })
    }

    render(){
        return (
            <div className="page">
                <div className="ongoing">
                    <h3>Alice Lost Her Socks</h3>
                    <div>
                        Created by: <a href="">a</a>--
                        <b>Alice lost her socks and needs to find them.</b>
                    </div>
                </div>
                <div className="discussion">
                    <h4>Please vote!</h4>
                    <ul>
                    {this.state.sentences.map(item => (
                        <li key={item.id}>
                            <a href="">{item.user}</a>:{item.content}
                            <div>
                            {item.vote}
                            <button className="upvoteButton" onClick={(e) => this.upvote(e, item.id)}>
                            <i className="arrow up icon"></i>
                            </button>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
                <div className="container col-lg-6 col-xs-12">
                Your sentence must include the word <strong className="keyWord">Frog</strong>.
                <form className="ui reply form" onSubmit={this.submit}>
                    <div className="field">
                        <textarea value={this.state.value} onChange={this.change} required>
                        </textarea>
                    </div>
                    <button className="ui teal submit icon button" type="submit">Post!</button>
                </form>
                </div>
            </div>
        );
    }
}

export default StoryIPR;