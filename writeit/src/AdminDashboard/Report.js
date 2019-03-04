import React, { Component } from 'react'

export class Report extends Component {
  render() {
    return (
        <div className="item">
            <div className="right floated content">
              <div className="ui small blue button">Archive</div>
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
