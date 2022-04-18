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
  ToastSubjectIdInvalid,
} from "./toasts";

import moment from "moment";

import { TestingProgress } from "./testing-progress.js";

import { ModalResultPopUp, ModalResultType } from "./modalResult";

const TimeFormat = "YYYY.MM.DD-HH:mm:ss";

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
        if (isValidSubjectId(props.subjectId)) {
          props.setTestingProgressState(TestingProgress.SubjectIdReceived);
          ToastSubjectIdLocked(props.getFullSubjectId());
          handleBreatheStart(props, setStartingTime);
        } else {
          ToastSubjectIdInvalid();
        }
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
      isDisable = true;
      break;
    case TestingProgress.Finished:
      btnStyle = "btn btn-success btn-lg shadow";
      btnName = "Sampling Completed";
      isDisable = true;
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

function isValidSubjectId(subjectId) {
  if (subjectId.length < 6) {
    return false;
  }

  return true;
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

          let recordData = new FormData();
          recordData.append("id", props.getFullSubjectId());
          recordData.append("time", startingTime);

          for (let value of recordData.values()) {
            console.log(value);
          }

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

          let modalResult = ModalResultType.INVALID;
          let info = "";

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
              info = result.info;
              switch (result.info) {
                case "negative":
                  console.log("negative");
                  modalResult = ModalResultType.NEGATIVE;
                  break;
                case "positive":
                  console.log("positive");
                  modalResult = ModalResultType.POSITIVE;
                  break;
                case "invalid":
                  console.log("invalid");
                  modalResult = ModalResultType.INVALID;
                  break;
                default:
                  console.log("invalid");
              }

              let resultData = new FormData();
              resultData.append("id", props.getFullSubjectId());
              resultData.append("time", startingTime);
              resultData.append("info", info);
              resultData.append("traceback", "");
              resultData.append("header", "");

              fetch("http://127.0.0.1:8001/save_result", {
                method: "POST",
                body: resultData,
                redirect: "follow",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST",
                },
              })
                .then((response) => response.text())
                .then((result) => console.log(result));

              PopUpResult(props, modalResult);
            });
        });
      })
      .catch((error) => {
        ToastDataSent.error(id);
        console.log("error", error);
      });
  }, 5000);
};

const PopUpResult = (props, modalResult) => {
  setTimeout(() => {
    props.setTestingProgressState(TestingProgress.Finished);
    ModalResultPopUp(props, modalResult);
  }, 5000);
};

function ControlButtons(props) {
  const [startingTime, setStartingTime] = useState("");

  return (
    <div className="d-grid gap-2">
      {mainButton(props, startingTime, setStartingTime)}
    </div>
  );
}

export default ControlButtons;
