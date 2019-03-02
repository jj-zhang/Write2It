import React from 'react';

class user extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status
        }
    }

}



class AdminDashboard extends React.Component {
    render() {
        return (
            <div class="container col-lg-6 col-xs-12">
                <div class="ui segment">
                <div class="ui middle aligned divided list">
                    <div class="item">
                        <div class="right floated content">
                            <div class="ui small blue button">Edit</div>
                        </div>
                        <img class="ui avatar image" src="../../public/assets/images/stevie.jpg"/>
                        <div class="content">
                            <div class="header">Snickerdoodle</div>
                            Active
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;