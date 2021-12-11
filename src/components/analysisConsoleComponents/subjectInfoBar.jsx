import React, { Component } from "react";
import ControlButtons from "./controlButtons";

class SubjectInfo extends Component {
  render() {
    return (
      <section className="p-5">
        <div className="container bg-white shadow p-3 rounded">
          <ControlButtons />

          <div className="row mt-3">
            <div className="input-group mb-2">
              <span className="input-group-text">BTX-DEV-</span>
              <input
                aria-label="Server"
                className="form-control"
                placeholder="Enter Test ID to begin sampling"
                type="text"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SubjectInfo;
