import React from 'react';
import {updateUser, getUser} from '../db/users';
import {getUserOngoingStories} from '../db/stories';
import './Profile.css';
import {formatRelative, subDays} from 'date-fns';
import {Link} from 'react-router-dom';
import placeholderimage from '../placeholder.png';

// a component to render user profiles
class Profile extends React.Component {
    constructor(props) {
        super(props);

        // fake API call to get this user's information
        const response = getUser({username: this.props.match.params.id});

        // fake API to get this user's ongoing stories
        const response2 = getUserOngoingStories({username: this.props.match.params.id});

        this.state = {
            displayEditBox: false,
            displaySavingChanges: false,
            user: response,
            ongoingStories: response2
        };
    }

    // toggle edit profile box
    toggleEditBox(e) {
        e.preventDefault();
        this.setState({displayEditBox: !this.state.displayEditBox});
    }

    // upload a new image
    updateImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const user = this.state.user;
            user.profilePhoto = reader.result;

            this.setState({
                imagefile: file,
                user: user
            });

        }
    }

    // listen to changes to state variables in the edit box form
    change(e) {
        e.preventDefault();
        const user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({user: user});
    }


    // save edit changes
    saveEdit(e) {
        e.preventDefault();
        const user = this.state.user;
        // fake API call to update a story
        const response = updateUser(user);

        if (response) {
            this.setState({displaySavingChanges: true, displayEditBox: false, user: response});
            const _self = this;
            setTimeout(() => _self.setState({displaySavingChanges: false, story: response}), 1000);
        }
    }


    render() {
        const user = this.state.user;

        const userType = localStorage.getItem('loginStatus');
        const username = localStorage.getItem('username');

        const canEdit = userType === 'admin' || user.username === username;

        return (
            <div>
                <div id="profile" className="page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="profileInfo col-lg-3 col-xs-12">
                                {
                                    this.state.displayEditBox ? (
                                        <div className="editBox">
                                            <form className="ui form" onSubmit={this.saveEdit.bind(this)}>
                                                <div className="profileIconContainer field">
                                                    <img id="iconImage" alt="User Icon Preview" src={user.profilePhoto || placeholderimage}></img>
                                                </div>
                                                <div className="profileInputContainer">
                                                    {/*<div className="field">*/}
                                                        {/*<label>Username</label>*/}
                                                        {/*<div className="ui left icon input">*/}
                                                            {/*<input type="text" name="username" value={user.username} onChange={this.change.bind(this)} placeholder="Username" required/>*/}
                                                            {/*<i className="user icon"></i>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                    <div className="field">
                                                        <label>Email</label>
                                                        <div className="ui left icon input">
                                                            <input type="text" name="email" value={user.email} onChange={this.change.bind(this)} placeholder="XXXX@gmail.com" required/>
                                                            <i className="envelope icon"></i>
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <label>Profile Icon</label>
                                                        <div className="ui left icon input">
                                                            <input type="file" name="icon" accept="image/*" onChange={this.updateImage.bind(this)}/>
                                                            <i className="arrow circle up icon"></i>
                                                        </div>
                                                    </div>

                                                    <div className="field">
                                                        <label>Password</label>
                                                        <div className="ui left icon input">
                                                            <input type="password" name="password" value={user.password} onChange={this.change.bind(this)} placeholder="Password" required/>
                                                            <i className="lock icon"></i>
                                                        </div>
                                                    </div>


                                                    <button className="ui teal button" type="submit">Save</button>


                                                    {/*{this.state.error &&*/}
                                                    {/*<div className="ui negative message">*/}
                                                        {/*<div className="header">*/}
                                                            {/*This username is taken.*/}
                                                        {/*</div>*/}
                                                        {/*<p>Please try again.</p>*/}
                                                    {/*</div>*/}
                                                    {/*}*/}
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="ui card">
                                            <div className="image">
                                                <img alt="User Icon Preview" src={user.profilePhoto || placeholderimage}/>
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

                                                <div className="text-center">
                                                    {canEdit && !this.state.displayEditBox &&
                                                    <button className="editButton ui basic button" onClick={this.toggleEditBox.bind(this)}>
                                                        <i className="edit icon"></i>
                                                        Edit profile
                                                    </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
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