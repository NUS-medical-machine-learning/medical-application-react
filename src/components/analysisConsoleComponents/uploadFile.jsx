import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

import { uploadFile, dummyProcessAfter } from "./http";

import { ToastDataSent } from "./toasts";

const handleClose = (props) => () => props.setShowModalUploadFile(false);
const handleShow = (props) => () => props.setShowModalUploadFile(true);

export const ModalUploadFilePopUp = handleShow;

function ModalUploadFile(props) {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    props.setIsFilePicked(true);
  };

  const handleSubmission = (props) => () => {
    if (props.isFilePicked) {
      const id = ToastDataSent.loading();

      console.log("Start uploading");
      let startingTime = "";

      handleClose(props)();
      setTimeout(() => {
        uploadFile(id, selectedFile, props, startingTime, dummyProcessAfter);
      }, 1500);
    } else {
      console.log("isFilePicked: False");
    }
  };

  return (
    <>
      <Modal
        show={props.showModalUploadFile}
        onHide={handleClose(props)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload HDF5 File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <input
              class="form-control"
              type="file"
              id="formFile"
              onChange={changeHandler}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button class="btn btn-outline-dark" onClick={handleClose(props)}>
            Close
          </button>
          <button
            className="btn btn-outline-danger shadow"
            onClick={handleSubmission(props)}
          >
            Upload and Test
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUploadFile;
