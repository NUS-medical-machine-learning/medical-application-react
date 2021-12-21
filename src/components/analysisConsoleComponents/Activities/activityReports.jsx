import React, { Component } from "react";
import ActivityReport from "./activityReport";

class ActivityReports extends Component {
  render() {
    console.log("RenderActivity");
    console.log(this.props.activities);
    return (
      <div>
        <h4 className="mb-3">Activity Log</h4>
        <hr></hr>
        {this.props.activities.reverse().map((activity) => (
          <div>{ActivityReport(activity)}</div>
        ))}
      </div>
    );
  }
}

export default ActivityReports;
