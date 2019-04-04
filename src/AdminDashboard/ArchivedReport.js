import React, { Component } from 'react';
import {formatDistance, subDays} from 'date-fns';
import {Link} from 'react-router-dom';


// React component to render the individual archived report.
export class ArchivedReport extends Component {
  render() {
    return (
        <div className="item">
        <div className="right floated content">
        </div>
            <div className="content">
                <div className="content">



                    <span>Submitted by <Link to={`/profile/${this.props.report.sender.name}`} className="user"> <strong>{this.props.report.sender.name}</strong> </Link>
                        {formatDistance(subDays(new Date(this.props.report.createdAt), 0), new Date())} ago</span>
                </div>
                <p>{this.props.report.message}</p>
            </div>
    </div>
    )
  }
}

export default ArchivedReport;
