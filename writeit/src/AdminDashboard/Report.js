import React, { Component } from 'react'

export class Report extends Component {
  render() {
    return (
        <div class="item">
            <div class="right floated content">
              <div class="ui small blue button">Archive</div>
            </div>
            <div class="content">
                <div class="header">{this.props.report.category}</div>
                <div class="content">
                Submitted by {this.props.report.name} {this.props.report.time}
                </div>
                {this.props.report.content}
            </div>
        </div>
    )
  }
}

export default Report
