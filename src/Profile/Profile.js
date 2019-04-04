import React from 'react';
import './Profile.css';
import {formatRelative, subDays} from 'date-fns';
import {Link} from 'react-router-dom';

// a component to render user profiles
class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayEditBox: false,
            displaySavingChanges: false,
            stories: []
        };
    }

    // toggle edit profile box
    toggleEditBox(e) {
        e.preventDefault();
        this.setState({displayEditBox: !this.state.displayEditBox});
    }


    // load user data
    componentDidMount() {
        // get user by name
        fetch('/user/' + this.props.match.params.id)
            .then((result) => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    return Promise.reject("Could not find users.");
                }
            })
            .then((json) => {

                this.setState({user: json});

                return json._id

            }).then((id) => {

            fetch('/storys?author=' + id)
                .then((result) => {
                    if (result.status === 200) {
                        return result.json();
                    } else {
                        return Promise.reject("Could not find stories.");
                    }
                })
                .then((json) => {
                    this.setState({
                        stories: this.state.stories.concat(json)
                    });
                }).catch((error) => {
            });

            fetch('/storys?sentences.author=' + id)
                .then((result) => {
                    if (result.status === 200) {
                        return result.json();
                    } else {
                        return Promise.reject("Could not find stories.");
                    }
                })
                .then((json) => {
                    this.setState({
                        stories: this.state.stories.concat(json)
                    });
                }).catch((error) => {
            });



        }).catch((error) => {
            console.log(error);
        });



    }

    // upload a new image
    updateImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.readAsDataURL(file);


        reader.onloadend = () => {
            const user = this.state.user;
            user.profilePic= reader.result;

            this.setState({
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

        const url = '/user/' + this.state.user._id;

        const request = new Request(url, {
            method: 'put',
            body: JSON.stringify(this.state.user),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
            .then((result) => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    return Promise.reject("Could not update user.");
                }
            })
            .then((json) => {
                    this.setState({user: json});

                    this.setState({displaySavingChanges: true, displayEditBox: false});
                    const _self = this;
                    setTimeout(() => _self.setState({displaySavingChanges: false}), 1000);
            }).catch((error) => {

        });
    }


    render() {
        const user = this.state.user;

        const userType = localStorage.getItem('loginStatus');
        const username = localStorage.getItem('username');

        const canEdit = userType === 'admin' || (user ? user.name === username : false);

        return user ?

        (
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
                                                    <img id="iconImage" alt="User Icon Preview" src={user.profilePic || "/assets/images/placeholder.png"}></img>
                                                </div>
                                                <div className="profileInputContainer">
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

                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="ui card">
                                            <div className="image">
                                                <img alt="User Icon Preview" src={user.profilePic || "/assets/images/placeholder.png"} />
                                            </div>
                                            <div className="content">
                                                <span className="header">{user.name}</span>
                                                <div className="meta">
                                            <span
                                                className="date">Joined {formatRelative(subDays(new Date(user.createdAt), 0), new Date())}</span>
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
                                <h1>Stories Contributed To</h1>

                                {this.state.stories.length > 0 ?

                                <OngoingStories ongoingStories={this.state.stories}/>
                                    :

                                    <div>No contributions yet.</div>
                                }
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


            </div>)

            :

            <div></div>

            ;
    }
}

// a component to redender a list of ongoing stories
class OngoingStories extends React.Component {
    render() {
        let ongoingStories = this.props.ongoingStories;
        ongoingStories = ongoingStories.map((story) => <div key={story._id} className="story ui segment">
            <Link to={`/story/${story._id}`}>{story.title}</Link>
        </div>);
        return (<div className="ui segments">{ongoingStories}</div>);
    }
}

export default Profile;