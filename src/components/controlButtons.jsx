import React, { Component } from "react";
import {handleBreatheStart, handleBreatheStop} from "./controlButtons"


class ControlButtons extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <h3 className="mb-3 mb-md-0">Subject Info</h3>
        </div>
        <div className="col">
          <button
            onClick={handleBreatheStop}
            className="btn btn-secondary btn-lg float-end ms-3"
          >
            Stop
          </button>
          <button
            onClick={handleBreatheStart}
            className="btn btn-primary btn-lg float-end"
          >
            Start
          </button>
        </div>
      </div>
    );
  }
}



export default ControlButtons;
