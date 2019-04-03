'use strict';

import React, { Component } from 'react';
import {formatDistance, subDays} from 'date-fns';

// React component to render the individual report.
export class Report extends Component {
  render() {
    const id = this.props.report._id;
    return (
        <div className="item">
            <div className="right floated content">
              <button className="ui small blue button" onClick={this.props.archiveList.bind(this, id)}>Archive</button>
            </div>
            <div className="content">
                <div className="content">
                    <span>Submitted by <strong>{this.props.report.sender.name}</strong> {formatDistance(subDays(new Date(this.props.report.createdAt), 0), new Date())} ago</span>
                </div>
                <p>{this.props.report.message}</p>
            </div>
        </div>
    )
  }
}

export default Report;
