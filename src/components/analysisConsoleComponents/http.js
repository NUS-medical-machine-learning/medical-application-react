import { ToastDataSent } from "./toasts";

import { ModalResultType } from "./modalResult";

import { TestingProgress } from "./testing-progress.js";

import { PopUpResult } from "./toasts";

export function getFile(id, startingTime, processResponse) {
  let formData = new FormData();

  console.log("Current time", startingTime);
  formData.append("time", startingTime);

  fetch("https://localhost:8001/getfile", {
    method: "POST",
    body: formData,
    redirect: "follow",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    },
  })
    .then(processResponse)
    .catch((error) => {
      ToastDataSent.error(id);
      console.log("error", error);
    });
}

export function uploadRecord(id, props, startingTime) {
  let recordData = new FormData();
  recordData.append("id", props.getFullSubjectId());
  recordData.append("time", startingTime);

  fetch("https://127.0.0.1:8001/record", {
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
}

export function uploadFile(id, bin_data, props, startingTime, processAfter) {
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

      processAfter(props, startingTime, info);

      PopUpResult(props, modalResult);
    });
}

export function saveFileResult(props, startingTime, info) {
  let resultData = new FormData();
  resultData.append("id", props.selectedFile.name);
  resultData.append("time", startingTime);
  resultData.append("info", info);
  resultData.append("traceback", "");
  resultData.append("header", "");

  fetch("https://127.0.0.1:8001/save_result", {
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
}

export function saveResult(props, startingTime, info) {
  let resultData = new FormData();
  resultData.append("id", props.getFullSubjectId());
  resultData.append("time", startingTime);
  resultData.append("info", info);
  resultData.append("traceback", "");
  resultData.append("header", "");

  fetch("https://127.0.0.1:8001/save_result", {
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
}
