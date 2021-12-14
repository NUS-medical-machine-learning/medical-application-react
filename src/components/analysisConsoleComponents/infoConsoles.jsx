import React, { Component } from "react";
import ActivityReports from "./Activities/activityReports";
import Breathe from "./Breath/Breath";

function InfoConsoles({ breatheSocket, compoundDetectionSocket }) {
  return (
    <section className="p-5">
      <div className="container p-0">
        <div className="row g-4">
          <Breathe
            socket={breatheSocket}
            compoundDetectionSocket={compoundDetectionSocket}
          />

          <ActivityReports />
        </div>
      </div>
    </section>
  );
}

export default InfoConsoles;
