import React from "react";

import { TestingProgress } from "./testing-progress.js";

export const subjectIdPrefix = "PNS-";

class SubjectIdInput extends React.Component {
  render() {
    return inputSubjectIdForm(this.props);
  }
}

function inputSubjectIdForm(props) {
  let isDisable;
  switch (props.testingProgressState) {
    case TestingProgress.New:
      isDisable = false;
      break
    default:
      isDisable = true;
  }

  return (
    <div className="input-group">
      <span className="input-group-text bg-tertiary">{subjectIdPrefix}</span>
      <input
        aria-label="Server"
        className="form-control bg-tertiary"
        placeholder="Enter Test ID to begin sampling"
        type="text"
        onChange={props.onChange}
        value={props.subjectId}
        disabled={isDisable}
      />
    </div>
  );
}

export default SubjectIdInput;
