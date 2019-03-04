import React from 'react';
import {createStory} from '../db/stories';
import {Redirect} from 'react-router';
import {getUser} from '../db/users';
import {getUserOngoingStories} from '../db/stories';
import './Profile.css';
import {formatRelative, subDays} from 'date-fns';
import {Link} from 'react-router-dom';

import placeholderimage from './placeholder.png';

// a component to render user profiles
class Profile extends React.Component {
    constructor(props) {
        super(props);

        // fake API call to get this user's information
        const response = getUser({username: this.props.match.params.id});

        // fake API to get this user's ongoing stories
        const response2 = getUserOngoingStories({username: this.props.match.params.id});

        this.state = {
            displayEditProfileBox: false,
            displaySavingChanges: false,
            user: response,
            ongoingStories: response2
        };
    }


    render() {

        const user = this.state.user;

        return (
            <div>
                <div id="profile" className="page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="profileInfo col-lg-3 col-xs-12">
                                <div className="ui card">
                                    <div className="image">
                                        <img src={user.profilePhoto || placeholderimage}/>
                                    </div>
                                    <div className="content">
                                        <span className="header">{user.username}</span>
                                        <div className="meta">
                                            <span
                                                className="date">Joined {formatRelative(subDays(user.dateCreated, 0), new Date())}</span>
                                        </div>
                                        <div className="description">
                                            {user.description || ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="ongoingStories col-lg-3 col-xs-12">
                                <h1>Ongoing Stories</h1>
                                <OngoingStories ongoingStories={this.state.ongoingStories}/>
                            </div>

                        </div>
                    </div>

                </div>


                {this.state.displaySavingChanges &&
                <div className="savingChangesMessage ui teal message">
                    <div className="header">
                        Success
                    </div>
                    <p>Your changes have been saved.</p>
                </div>
                }


            </div>);
    }
}

// a component to redender a list of ongoing stories
class OngoingStories extends React.Component {

    render() {

        let ongoingStories = this.props.ongoingStories;

        ongoingStories = ongoingStories.map((story) => <div key={story.id} className="story ui segment">
            <Link to={`/story/${story.id}`}>{story.title}</Link>
        </div>);

        return (<div className="ui segments">{ongoingStories}</div>);
    }
}


export default Profile;