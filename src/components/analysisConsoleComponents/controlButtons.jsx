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
  ToastSubjectIdInvalid
} from "./toasts";

import moment from "moment";

import { TestingProgress } from "./testing-progress.js";

import { getFile, uploadRecord, uploadFile, saveResult } from "./http";

const TimeFormat = "YYYY.MM.DD-HH:mm:ss";

function mainButton(props, startingTime, setStartingTime) {
  let btnStyle = "";
  let btnName = "";
  let isDisable = false;
  let btnOnClick = () => {};

  switch (props.testingProgressState) {
    case TestingProgress.New:
      btnStyle = "btn btn-outline-info btn-lg shadow";
      btnName = "Start Sampling";
      isDisable = true;
      break;
    case TestingProgress.SubjectIdReceived:
      btnStyle = "btn btn-outline-info btn-lg shadow";
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
      btnStyle = "btn btn-info btn-lg shadow";
      btnName = "Sampling Completed";
      btnOnClick = () => {
        props.resetToNewProgress();
      };
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
    getFile(id, startingTime, (response) => {
        response.arrayBuffer().then((buffer) => {
          let bin_data = buffer;

          uploadRecord(id, props, startingTime);

          uploadFile(id, bin_data, props, startingTime, saveResult);
        });
      })      

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
