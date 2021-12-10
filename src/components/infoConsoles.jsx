import React, { Component } from "react";
import ActivityConsole from "./activityConsole";
import Graph from "./graph";

class InfoConsoles extends Component {
  render() {
    return (
      <section className="p-5">
        <div className="container p-0">
          <div className="row g-4">
            <Graph />
            
            <ActivityConsole />
          </div>
        </div>
      </section>
    );
  }
}

export default InfoConsoles;
