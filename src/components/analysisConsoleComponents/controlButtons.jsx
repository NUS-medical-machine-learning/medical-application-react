import React, { Component } from "react";
import {
  BREATH_INLET_SERVICE_URL,
  COMPOUND_DETECTION_SERVICE_URL,
} from "../../apiCalls/common";
import { Status } from "./Activities/activityReport";

class ControlButtons extends Component {
  postCancelSample = () => {
    return fetch(`${COMPOUND_DETECTION_SERVICE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ key: "" }),
    }).then((res) => {
      return res.json();
    });
  };

  postValveIsRegulated = (boolean) => {
    return fetch(`${BREATH_INLET_SERVICE_URL}/flow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ valveIsRegulated: boolean }),
    });
  };
  postStartStopBreathe = (action) => {
    return fetch(`${COMPOUND_DETECTION_SERVICE_URL}/detection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ action }),
    }).then((res) => {
      return res.json();
    });
  };

  handleBreatheStart = () => {
    //   breathDispatch({ eventStatus: "Start isLoading" });
    console.log("Start Button Clicked")
    this.postValveIsRegulated(true)
      .then((data) => {
        if (data.status === "fail") {
          return console.log(data.message);
        }
      })
      .catch((err) => console.log(err));

    this.postStartStopBreathe("START")
      .then((data) => {
        if (data.status === "fail") {
          return console.log(data.message);
        }
        this.props.onAddActivity(this.props.subjectInfo(), Status.Started);
        //   breathDispatch({ eventStatus: "true: waitingForKey" });
      })
      .catch((err) => console.log(err));
  };

  handleBreatheStop = () => {
    //   breathDispatch({ eventStatus: "Stop isLoading" });

    this.postValveIsRegulated(false)
      .then((data) => {
        if (data.status === "fail") {
          return console.log(data.message);
        }
      })
      .catch((err) => console.log(err));

    this.postCancelSample().catch((error) => console.log(error.message));

    this.postStartStopBreathe("STOP")
      .then((data) => {
        if (data.status === "fail") {
          return console.log(data.message);
        }
        this.props.onAddActivity(this.props.subjectInfo(), Status.Stopped);
        //   breathDispatch({ eventStatus: "false: waitingForKey" });
      })
      .catch((err) => console.log(err.message));
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <h3 className="mb-3 mb-md-0">Subject Info</h3>
        </div>
        <div className="col">
          <button
            onClick={this.handleBreatheStop}
            className="btn btn-secondary btn-lg float-end ms-3"
          >
            Stop
          </button>
          <button
            onClick={this.handleBreatheStart}
            className="btn btn-primary btn-lg float-end"
          >
            Start
          </button>
        </div>
      </div>
    );
  }
}

export default ControlButtons;
