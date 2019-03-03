import React from 'react';
import { th } from 'date-fns/esm/locale';

class StoryIPR extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author:'',
            context:'',
            sentences: [],
            value:'',
            keyWord:'',
            winner:''
        }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.upvote = this.upvote.bind(this);
    }

    componentDidMount(){
        // this is an api call data from api call hardcoded
        this.setState({
            title:'Alice Lost Her Socks',
            author: 'a',
            context:'Alice lost her socks and needs to find them.',
            sentences: [
                {id:0, user:'a', content:'She needed help.',vote:99}
            ],
            keyWord:'Frog'
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.winner !== prevState.winner){
            console.log(this.state.winner);
            console.log(prevState.winner);
            const NewContext = this.state.context + this.state.winner;
            console.log(NewContext);
            this.setState({
                        context: NewContext,
                        sentences: [],
                        keyWord: 'Water',
                        winner:''
            });
        }
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
        const NewSentences = this.state.sentences;
        let w = '';
        for(let i=0;i<NewSentences.length;i++){
            if(NewSentences[i].id === n){
                NewSentences[i].vote += 1;
                if(NewSentences[i].vote === 100){
                    w = NewSentences[i].content;
                }
            }
        }
        this.setState(prevState => {
            return{
                sentences: NewSentences,
                value: prevState.value,
                winner: w
            }
        })
        //this.refs.btn.setAttribute("disabled", "disabled");
    }

    render(){
        return (
            <div className="page">
                <div className="ongoing">
                    <h3>{this.state.title}</h3>
                    <div>
                        Created by: <a href="">{this.state.author}</a>--
                        <b>{this.state.context}</b>
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
                            <button ref="btn" className="upvoteButton" onClick={(e) => this.upvote(e, item.id)}>Like!
                            </button>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
                <div className="container col-lg-6 col-xs-12">
                Your sentence must include the word <strong className="keyWord">{this.state.keyWord}</strong>.
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