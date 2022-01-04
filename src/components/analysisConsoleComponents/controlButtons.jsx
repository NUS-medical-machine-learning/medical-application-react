import React, { useState } from "react";
import {
  BREATH_INLET_SERVICE_URL,
  COMPOUND_DETECTION_SERVICE_URL,
} from "../../apiCalls/common";

import {
  ToastStart,
  ToastStop,
  ToastSubjectIdLocked,
  ToastDataSent,
} from "./toasts";

import moment from "moment";

import { TestingProgress } from "./testing-progress.js";

const TimeFormat = "YYYY.MM.DD-HH:mm:ss";

function ControlButtons(props) {
  const [startingTime, setStartingTime] = useState("");

  return (
    <div className="d-grid gap-2">
      {mainButton(props, startingTime, setStartingTime)}
      {subjectIdButton(props)}
    </div>
  );
}

function mainButton(props, startingTime, setStartingTime) {
  let btnStyle = "";
  let btnName = "";
  let isDisable = false;
  let btnOnClick = () => {};

  switch (props.testingProgressState) {
    case TestingProgress.New:
      btnStyle = "btn btn-outline-success btn-lg shadow";
      btnName = "Start Sampling";
      isDisable = true;
      break;
    case TestingProgress.SubjectIdReceived:
      btnStyle = "btn btn-outline-success btn-lg shadow";
      btnName = "Start Sampling";
      btnOnClick = () => {
        handleBreatheStart(props, setStartingTime);
      };
      break;
    case TestingProgress.AnalyzingStarted:
      btnStyle = "btn btn-outline-danger btn-lg shadow";
      btnName = "Stop Sampling";
      btnOnClick = () => {
        handleBreatheStop(props, startingTime);
      };
      break;
    case TestingProgress.AnalyzingStopped:
      btnStyle = "btn btn-outline-warning btn-lg shadow";
      btnName = "Sending Data";
      isDisable = true;
      break;
    case TestingProgress.DataSent:
      btnStyle = "btn btn-outline-warning btn-lg shadow";
      btnName = "Waiting for result";
      break;
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
    default:
      btnOnClick = () => {
        props.resetToNewProgress();
      };
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

const handleBreatheStart = (props, setStartingTime) => {
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
      setStartingTime(moment().format(TimeFormat));
    })
    .catch((err) => {
      console.log(err);
      ToastStart.error(id);
    })
    .finally(() => {
      props.setIsLoadingMainButton(false);
    });
};

const handleBreatheStop = (props, startingTime) => {
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

      uploadDataToDummyServer(props, startingTime);
    })
    .catch((err) => {
      console.log(err.message);
      ToastStop.error(id);
    })
    .finally(() => {
      props.setIsLoadingMainButton(false);
    });
};

export const handleBreatheStopSilent = () => {
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
    .catch((err) => {
      console.log(err.message);
    });
};

const uploadDataToDummyServer = (props, startingTime) => {
  const id = ToastDataSent.loading();

  setTimeout(() => {
    let formData = new FormData();
    console.log("Current time", startingTime);
    formData.append("time", startingTime);

    let bin_data = "";

    fetch("http://localhost:8001/getfile", {
      method: "POST",
      body: formData,
      redirect: "follow",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    })
      .then((response) => {
        response.arrayBuffer().then((buffer) => {
          bin_data = buffer;

          console.log("bin_data", bin_data);

          fetch("https://www.aiteam.link:8100/upload_file", {
            method: "POST",
            body: bin_data,
            redirect: "follow",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST",
            },
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.info === "fail") {
                return console.log(result);
              }
            });

          let recordData = new FormData();
          recordData.append("id", "testid");
          recordData.append("time", startingTime);

          fetch("http://127.0.0.1:8001/record", {
            method: "POST",
            body: recordData,
            redirect: "follow",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST",
            },
          })
            .then((response) => response.text())
            .then((result) => console.log(result));

          ToastDataSent.success(id);
          props.setTestingProgressState(TestingProgress.DataSent);
        });
      })
      .catch((error) => {
        ToastDataSent.error(id);
        console.log("error", error);
      });
  }, 5000);
};
export default ControlButtons;
