import React, { Component } from "react";
import ActivityReport from "./activityReport";
import { Status } from "./activityReport";

class ActivityReports extends Component {
  state = {
    activities: [
      { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Started },
      { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Stopped },
      { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Sending },
      { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Negative },
      { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Positive },
    ],
  };

  handleAddActivity = ({ subjectID, event }) => {
    const activities = this.state.activities.push({ subjectID, event });
    this.setState({ activities });
  };

  render() {
    return (
      <div className="col-lg-4">
        <div className="bg-white shadow text-dark rounded p-3">
          <h5 className="mb-3">Activity</h5>
          <hr></hr>
          {this.state.activities.map((activity) => (
            <div>{ActivityReport(activity)}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default ActivityReports;
