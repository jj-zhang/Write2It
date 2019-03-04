import React from 'react';
import {createStory} from '../db/stories';
import {Redirect} from 'react-router';
import {getUser} from '../db/users';
import './Profile.css';
import {formatRelative, subDays} from 'date-fns';

import placeholderimage from './placeholder.png';




class Profile extends React.Component {
    constructor(props) {
        super(props);

        // fake API to get this story's data
        const response = getUser({username: this.props.match.params.id});

        this.state = {
            displayEditProfileBox: false,
            displaySavingChanges: false,
            user: response
        };
    }


    render() {

        const user = this.state.user;

        return (
            <div>
                <div id="profile" className="page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="profileInfo offset-lg-3 col-lg-3 col-xs-12">
                                <div className="ui card">
                                    <div className="image">
                                        <img src={user.profilePhoto || placeholderimage}/>
                                    </div>
                                    <div className="content">
                                        <span className="header">{user.username}</span>
                                        <div className="meta">
                                            <span className="date">Joined {formatRelative(subDays(user.dateCreated, 0), new Date())}</span>
                                        </div>
                                        <div className="description">
                                            {user.description || ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="ongoingStories col-lg-3 col-xs-12">
                                <h1>Ongoing Stories</h1>
                                {/*<div className="stories ui segments">*/}
                                    {/*<div className="story ui segment">*/}
                                        {/*<a href="">I like to eat cake</a>*/}
                                    {/*</div>*/}
                                    {/*<div className="story ui segment">*/}
                                        {/*<a href="">I like to eat cake</a>*/}
                                    {/*</div>*/}
                                    {/*<div className="story ui segment">*/}
                                        {/*<a href="">I like to eat cake</a>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
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

export default Profile;