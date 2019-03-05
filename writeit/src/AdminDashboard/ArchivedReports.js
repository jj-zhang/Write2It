import React, { Component } from 'react';
import ArchivedReport from './ArchivedReport';

export class ArchivedReports extends Component {
  render() {
    return this.props.archivedReports.map((archivedReport) => (
        <ArchivedReport key={archivedReport.id} archivedReport = {archivedReport}/>
    ));
  }
}

export default ArchivedReports;