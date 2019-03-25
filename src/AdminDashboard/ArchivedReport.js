import React, { Component } from 'react'

// React component to render the individual archived report.
export class ArchivedReport extends Component {
  render() {
    return (
        <div className="item">
        <div className="right floated content">
        </div>
        <div className="content">
            <div className="header">{this.props.archivedReport.category}</div>
            <div className="content">
            Submitted by {this.props.archivedReport.name} {this.props.archivedReport.time}
            </div>
            {this.props.archivedReport.content}
        </div>
    </div>
    )
  }
}

export default ArchivedReport
