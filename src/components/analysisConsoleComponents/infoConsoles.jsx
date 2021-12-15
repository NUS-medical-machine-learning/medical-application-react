import React from "react";
import ActivityReports from "./Activities/activityReports";
import Breathe from "./Breath/Breath";

class InfoConsoles extends React.Component {
  render() { 
    return (
      <section className="p-5">
        <div className="container p-0">
          <div className="row g-4">
            <Breathe
              socket={this.props.breatheSocket}
              compoundDetectionSocket={this.props.compoundDetectionSocket}
            />

            <ActivityReports activities={this.props.activities} />
          </div>
        </div>
      </section>
    );
  }
}
 
export default InfoConsoles;
