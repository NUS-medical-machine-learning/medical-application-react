import React, { Component } from "react";
import {
  BREATH_INLET_SERVICE_URL,
  COMPOUND_DETECTION_SERVICE_URL,
} from "../../apiCalls/common";

import { ToastStart, ToastStop, ToastSubjectIdLocked } from "./toasts";

import { TestingProgress } from "./testing-progress.js";

class ControlButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoadingMainButton: false };
  }

  render() {
    return (
      <div className="d-grid gap-2">
        {mainButton(this.props, handleBreatheStart, this)}
        {subjectIdButton(this.props)}
      </div>
    );
  }
}

function mainButton(props, handleBreatheStart, buttonsController) {
  let btnStyle = "";
  let btnName = "";
  let isDisable = false;
  let btnOnClick = () => {
    handleBreatheStart(props);
  };

  switch (props.testingProgressState) {
    case TestingProgress.New:
      btnStyle = "btn btn-outline-success btn-lg shadow";
      btnName = "Start Sampling";
      isDisable = true;
      break;
    case TestingProgress.SubjectIdReceived:
      btnStyle = "btn btn-outline-success btn-lg shadow";
      btnName = "Start Sampling";
      break;
    case TestingProgress.AnalyzingStarted:
      btnStyle = "btn btn-outline-danger btn-lg shadow";
      btnOnClick = () => {
        handleBreatheStop(props);
      };
      btnName = "Stop Sampling";
      break;
    case TestingProgress.AnalyzingStopped:
      btnStyle = "btn btn-outline-warning btn-lg shadow";
      btnName = "Send Data";
    default:
    // code block
  }

  isDisable = isDisable || props.isLoadingMainButton;

  return (
    <button onClick={btnOnClick} className={btnStyle} disabled={isDisable}>
      {btnName}
    </button>
  );
}

function subjectIdButton(props) {
  let btnLabel = "";
  let btnOnClick = () => {};

  switch (props.testingProgressState) {
    case TestingProgress.New:
      btnOnClick = () => {
        props.setTestingProgressState(TestingProgress.SubjectIdReceived);
        ToastSubjectIdLocked(props.subjectId);
      };
      btnLabel = "Lock Subject ID";
      break;
    case TestingProgress.SubjectIdReceived:
      btnOnClick = () => {
        props.setTestingProgressState(TestingProgress.New);
        props.resetSubjectId();
      };
      btnLabel = "Refresh Subject ID";
      break;
    default:
      btnLabel = "Refresh Subject ID";
  }

  return (
    <button onClick={btnOnClick} className="btn btn-outline-info btn-lg shadow">
      {btnLabel}
    </button>
  );
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
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ action }),
  }).then((res) => {
    return res.json();
  });
};

const handleBreatheStart = (props) => {
  //   breathDispatch({ eventStatus: "Start isLoading" });

  const id = ToastStart.loading();
  props.setIsLoadingMainButton(true);

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
      ToastStart.success(id);
      props.setTestingProgressState(TestingProgress.AnalyzingStarted);
    })
    .catch((err) => {
      console.log(err);
      setTimeout(() => {
        ToastStart.error(id);
      }, 2000);
    })
    .finally(() => {
      setTimeout(() => {
        props.setIsLoadingMainButton(false);
      }, 2000);
    });
};

export const handleBreatheStop = (props) => {
  //   breathDispatch({ eventStatus: "Stop isLoading" });
  const id = ToastStop.loading();
  props.setIsLoadingMainButton(true);

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
      ToastStop.success(id);
      props.setTestingProgressState(TestingProgress.AnalyzingStopped);
    })
    .catch((err) => {
      console.log(err.message);
      ToastStop.error(id);
    })
    .finally(() => {
      props.setIsLoadingMainButton(false);
    });
};

export default ControlButtons;
