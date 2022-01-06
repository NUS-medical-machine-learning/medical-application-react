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
  let title;
  switch (props.currentModalResultType) {
    case ModalResultType.NEGATIVE:
      title = (
        <div>
          Result
          <Badge pill bg="light" text="dark">
            {fullSubjectId}
          </Badge>
          : <Badge bg="success">NEGATIVE</Badge>
        </div>
      );
      break;
    case ModalResultType.POSITIVE:
      title = (
        <div>
          Result
          <Badge pill bg="light" text="dark">
            {fullSubjectId}
          </Badge>
          : <Badge bg="danger">POSITIVE</Badge>
        </div>
      );
      break;
    case ModalResultType.INVALID:
      title = (
        <div>
          Result
          <Badge pill bg="light" text="dark">
            {fullSubjectId}
          </Badge>
          : <Badge bg="warning">INVALID</Badge>
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
