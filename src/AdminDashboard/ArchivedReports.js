'use strict';

import React, { Component } from 'react';
import ArchivedReport from './ArchivedReport';

// React component to render a list of archived reports.
export class ArchivedReports extends Component {
  render() {
    // Mapping each individual achived report.
    return this.props.archivedReports.map((report) => (
        <ArchivedReport key={report._id} report = {report}/>
    ));
  }
}

export default ArchivedReports;