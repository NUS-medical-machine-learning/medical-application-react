import React, { Component } from "react";
import {
  BREATH_INLET_SERVICE_URL,
  COMPOUND_DETECTION_SERVICE_URL,
} from "../../apiCalls/common";

class ControlButtons extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <h3 className="mb-3 mb-md-0">Subject Info</h3>
        </div>
        <div className="col">
          <button
            onClick={handleBreatheStop}
            className="btn btn-secondary btn-lg float-end ms-3"
          >
            Stop
          </button>
          <button
            onClick={handleBreatheStart}
            className="btn btn-primary btn-lg float-end"
          >
            Start
          </button>
        </div>
      </div>
    );
  }
}

const postCancelSample = () => {
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

const postValveIsRegulated = (boolean) => {
  return fetch(`${BREATH_INLET_SERVICE_URL}/flow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ valveIsRegulated: boolean }),
  });
};

const postStartStopBreathe = (action) => {
  return fetch(`${COMPOUND_DETECTION_SERVICE_URL}/detection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ action }),
  }).then((res) => res.json());
};

const handleBreatheStart = () => {
  //   breathDispatch({ eventStatus: "Start isLoading" });
  postValveIsRegulated(true)
    .then((data) => {
      if (data.status === "fail") {
        return console.log(data.message);
      }
    })
    .catch((err) => console.log(err));

  postStartStopBreathe("START")
    .then((data) => {
      if (data.status === "fail") {
        return console.log(data.message);
      }
      //   breathDispatch({ eventStatus: "true: waitingForKey" });
    })
    .catch((err) => console.log(err));
};

const handleBreatheStop = () => {
  //   breathDispatch({ eventStatus: "Stop isLoading" });

  postValveIsRegulated(false)
    .then((data) => {
      if (data.status === "fail") {
        return console.log(data.message);
      }
    })
    .catch((err) => console.log(err));

  postCancelSample().catch((error) => console.log(error.message));

  postStartStopBreathe("STOP")
    .then((data) => {
      if (data.status === "fail") {
        return console.log(data.message);
      }
      //   breathDispatch({ eventStatus: "false: waitingForKey" });
    })
    .catch((err) => console.log(err.message));
};


export default ControlButtons;
