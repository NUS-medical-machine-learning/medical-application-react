import React from "react";

import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";

const handleClose = (props) => () => props.setShowModalResult(false);
const handleShow = (props) => () => props.setShowModalResult(true);

export class ModalResultType {
  static NEGATIVE = new ModalResultType();
  static POSITIVE = new ModalResultType();
  static INVALID = new ModalResultType();
}

export const ModalResultPopUp = (props, modalResultType) => {
  props.setCurrentModalResultType(modalResultType);
  handleShow(props)();
};

function ModalResult(props) {
  let fullSubjectId = props.getFullSubjectId();
  let title = "";
  let message;
  switch (props.currentModalResultType) {
    case ModalResultType.NEGATIVE:
      title = "NEGATIVE";
      message = (
        <div>
          <div>
            Congratulations to subject ID:{" "}
            <Badge pill bg="light" text="dark">
              {fullSubjectId}
            </Badge>
            !
          </div>
          <div>
            Your COVID-19 test result is <Badge bg="success">NEGATIVE</Badge>
          </div>
        </div>
      );
      break;
    case ModalResultType.POSITIVE:
      title = "POSITIVE";
      message = (
        <div>
          <div>
            We are regret to inform subject ID:{" "}
            <Badge pill bg="light" text="dark">
              {fullSubjectId}
            </Badge>
            that:
          </div>
          <div>
            Your COVID-19 test result is <Badge bg="danger">POSITIVE</Badge>
          </div>
        </div>
      );
      break;
    case ModalResultType.INVALID:
      title = "INVALID";
      message = (
        <div>
          <div>
            We are regret to inform subject ID:{" "}
            <Badge pill bg="light" text="dark">
              {fullSubjectId}
            </Badge>
            that:
          </div>
          <div>
            Your COVID-19 test result is <Badge bg="warning">INVALID</Badge>
          </div>
        </div>
      );
      break;
    default:
      console.log("Error with modal result");
  }

  return (
    <>
      <Modal
        show={props.showModalResult}
        onHide={handleClose(props)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <button
            onClick={props.resetToNewProgress}
            className="btn btn-outline-info shadow"
          >
            Refresh Subject ID
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;
