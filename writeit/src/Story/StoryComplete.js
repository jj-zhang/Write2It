import React from 'react';
import './Story.css';
import { th } from 'date-fns/esm/locale';

class StoryComplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            context:'',
            comments: [],
            value: ''
        };
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount(){
        // this is an api call data from api call hardcoded
        this.setState({
            title:'Delicious Hope',
            context:'Xander and Jared are from two completly different worlds. The jock and the nerd.',
            comments:[
                {id:0,user:'a',content:'So good!'},
                {id:1,user:'a',content:'I like it.'}
            ]
        })
    }
    change(e){
        e.persist();

        this.setState(prevState => {
            return{
                comments: prevState.comments,
                value: e.target.value
            }
        })
    }

    submit(e){
        e.preventDefault();
        const l = this.state.comments.length;
        this.state.comments.push({id:l,user:'a',content:this.state.value});
        this.setState(prevState => {
            return{
                comments: prevState.comments,
                value: ''
            }
        })
    }

    render(){
        return (
            <div className="page">
            <div className="storyComplete">
            <h3>{this.state.title}</h3>
            {this.state.context}
            </div>
            <div className="commentsComplete">
                <b>Comments:</b>
                <ul>
                    {this.state.comments.map(item => (
                        <li key={item.id}><a href="">{item.user}</a>:{item.content}</li>
                    ))}
                </ul>
            </div>
            <div className="container col-lg-6 col-xs-12">
                <form className="ui reply form" onSubmit={this.submit}>
                    <div className="field">
                        <textarea value={this.state.value} onChange={this.change} required>
                        </textarea>
                    </div>
                    <button className="ui teal submit icon button" type="submit">Add comment</button>
                </form>
            </div>
            </div>
        );
    }
}

export default StoryComplete;