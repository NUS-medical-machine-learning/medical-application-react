import React, { Component } from "react";
import {
  BREATH_INLET_SERVICE_URL,
  COMPOUND_DETECTION_SERVICE_URL,
} from "../../apiCalls/common";

import { ToastStart, ToastStop } from "./toasts";

import { TestingProgress } from "./testing-progress.js";

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
    console.log("Start Button Clicked");
    const id = ToastStart.loading();
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
        //   breathDispatch({ eventStatus: "true: waitingForKey" });
        ToastStart.success(id);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          ToastStart.error(id);
        }, 2000);
      });
  };

  handleBreatheStop = () => {
    //   breathDispatch({ eventStatus: "Stop isLoading" });
    const id = ToastStop.loading();
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
        //   breathDispatch({ eventStatus: "false: waitingForKey" });
        ToastStop.success(id);
      })
      .catch((err) => {
        console.log(err.message);
        ToastStop.error(id);
      });
  };

  render() {
    return (
      <div className="d-grid gap-2">
        {mainButton(this.props.testingProgressState, this.handleBreatheStart)}
        {subjectIdButton(this.props)}
      </div>
    );
  }
}

function mainButton(testingProgressState, handleBreatheStart) {
  let btnStyle = "";
  let isDisable = true;

  switch (testingProgressState) {
    case TestingProgress.New:
      btnStyle = "btn btn-outline-success btn-lg shadow";
      break;
    case TestingProgress.SubjectIdReceived:
      btnStyle = "btn btn-outline-success btn-lg shadow";
      isDisable = false;
      break;
    default:
    // code block
  }

  return (
    <button onClick={handleBreatheStart} className={btnStyle} disabled={isDisable}>
      Start
    </button>
  );
}

function subjectIdButton(props) {
  let btnLabel = "";
  let btnOnClick = () => {};

  switch (props.testingProgressState) {
    case TestingProgress.New:
      btnOnClick = () => props.setTestingProgressState(
        TestingProgress.SubjectIdReceived
      );
      btnLabel = "Lock Subject ID";
      break;
    case TestingProgress.SubjectIdReceived:
      btnOnClick = () => {
        props.setTestingProgressState(TestingProgress.New);
        props.resetSubjectId();
      }
      btnLabel = "Refresh Subject ID";
      break;
    default:
      btnLabel = "Refresh Subject ID";
  }

  return (
    <button 
    onClick={btnOnClick}
    className="btn btn-outline-info btn-lg shadow">{btnLabel}</button>
  );
}

export default ControlButtons;
