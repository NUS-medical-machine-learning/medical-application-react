import React, { Component } from "react";
import ActivityReport from "./activityReport";
import { Status } from "./activityReport";

class ActivityReports extends Component {
  render() {
    console.log("RenderActivity")
    console.log(this.props.activities);
    return (
      <div className="col-lg-4">
        <div className="bg-white shadow text-dark rounded p-3">
          <h5 className="mb-3">Activity</h5>
          <hr></hr>
          {this.props.activities.map((activity) => (
            <div>
              {ActivityReport(activity)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
// <ActivityReport subjectInfo={activity.subjectInfo} event={activity.event} />

export default ActivityReports;
