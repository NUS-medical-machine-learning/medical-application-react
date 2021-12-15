import React, { Component } from "react";
import ControlButtons from "./controlButtons";

class SubjectInfo extends Component {

  render() {
    return (
      <section className="p-5">
        <div className="container bg-white shadow p-3 rounded">
          <ControlButtons
            onAddActivity={this.props.onAddActivity}
            subjectInfo={this.props.subjectInfo}
          />

          <div className="row mt-3">
            <div className="input-group mb-2">
              <span className="input-group-text">BTX-DEV-</span>
              <input
                aria-label="Server"
                className="form-control"
                placeholder="Enter Test ID to begin sampling"
                type="text"
                onKeyDown={this.props.handleKeyDown}
                onChange={this.props.onChange}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SubjectInfo;
