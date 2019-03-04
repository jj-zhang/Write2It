import React, { Component } from 'react';
import Report from './Report';

export class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [
                {
                    id: 1,
                    name: "Mike",
                    category: "Bug",
                    time: "3 days ago",
                    content: "Hello, I cannot seem to create new stories."
                },
                {
                  id: 2,
                  name: "John",
                  category: "Suggestion",
                  time: "1 week ago",
                  content: "Hi, I suggest that we can change the background color."
                },
                {
                  id: 3,
                  name: "Sam",
                  category: "Bug",
                  time: "3 days ago",
                  content: "Hello, I cannot vote to the new story."
                } 
            ]
        }
    }
  render() {
    return this.state.reports.map((report) => (
      <Report key={report.id} report={report}/>
    ));
  };
}

export default Reports
