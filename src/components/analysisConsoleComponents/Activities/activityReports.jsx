import React, { Component } from "react";
import ActivityReport from "./activityReport";

class ActivityReports extends Component {
  render() {
    console.log("RenderActivity")
    console.log(this.props.activities);
    return (
      <div className="col-lg-4">
        <div className="shadow text-dark rounded p-3">
          <h5 className="mb-3">Activity</h5>
          <hr></hr>
          {this.props.activities.reverse().map((activity) => (
            <div>{ActivityReport(activity)}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default ActivityReports;
