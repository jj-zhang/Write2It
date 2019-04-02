'use strict';

import React, { Component } from 'react';

// React component to render the individual report.
export class Report extends Component {
  render() {
    const id = this.props.report.id;
    return (
        <div className="item">
            <div className="right floated content">
              <button className="ui small blue button" onClick={this.props.archiveList.bind(this,id)}>Archive</button>
            </div>
            <div className="content">
                <div className="header">{this.props.report.category}</div>
                <div className="content">
                Submitted by {this.props.report.name} {this.props.report.time}
                </div>
                {this.props.report.content}
            </div>
        </div>
    )
  }
}

export default Report
