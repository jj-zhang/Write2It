import React, { Component } from 'react';
import Report from './Report';

// React component to render the list of reports.
export class Reports extends Component {
    render() {
      return this.props.reports.map((report) => (
        <Report key={report.id} report={report} archiveList={this.props.archiveList}/>
      ));
    };
}

export default Reports