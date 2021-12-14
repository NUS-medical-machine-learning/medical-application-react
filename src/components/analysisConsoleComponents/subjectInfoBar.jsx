import React, { Component } from "react";
import ControlButtons from "./controlButtons";

class SubjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        alert("A name was entered: " + this.state.value);
        event.preventDefault();
      }
    };

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
                onKeyDown={handleKeyDown}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SubjectInfo;
