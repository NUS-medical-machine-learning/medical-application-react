import React, { useState } from "react";
import NavBar from "./navbar";
import useSocket from "../../helpers/Hooks/useSocket";
import {
  BREATH_INLET_ROOT_URL,
  COMPOUND_DETECTION_ROOT_URL,
} from "../../apiCalls/common";
import { Status } from "./Activities/activityReport";
import ControlButtons from "./controlButtons";
import SubjectIdInput from "./sujectIdInput";
import ActivityReports from "./Activities/activityReports";
import Breathe from "./Breath/Breath";
import firebase from "firebase/compat/app";

import { ToastContainer, toast } from "react-toastify";
import { Slide } from "react-toastify";

const MAX_LENGTH_OF_ACTIVITIES_ARRAY = 4;

function AnalysisConsole() {
  const [breatheSocket] = useSocket(BREATH_INLET_ROOT_URL);
  const [compoundDetectionSocket] = useSocket(COMPOUND_DETECTION_ROOT_URL);

  if (process.env.REACT_APP_SKIN_IN_USE === "TRACK") {
    breatheSocket.disconnect();
    compoundDetectionSocket.disconnect();
  } else if (process.env.REACT_APP_SKIN_IN_USE === "EXPLORE") {
    breatheSocket.disconnect();
    compoundDetectionSocket.disconnect();
  } else if (
    process.env.REACT_APP_SKIN_IN_USE === "BREATHE" ||
    process.env.REACT_APP_SKIN_IN_USE === "BREATHE_RD"
  ) {
    console.log("BREATHE");
  } else if (process.env.REACT_APP_SKIN_IN_USE === "MOBILE") {
    breatheSocket.disconnect();
    compoundDetectionSocket.disconnect();
  }

  const [subjectId, setSubjectId] = useState(" ");
  const [activities, setActivities] = useState([
    { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Started },
    { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Stopped },
    { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Sending },
    { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Negative },
    { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Positive },
  ]);

  const handleChange = (event) => {
    setSubjectId(event.target.value);
  };

  const handleAddActivity = (s, e) => {
    const newActivity = { subjectID: s, event: e };
    const newActivities = activities.slice();
    newActivities.push(newActivity);
    if (newActivities.length > MAX_LENGTH_OF_ACTIVITIES_ARRAY) {
      newActivities.shift();
    }
    setActivities(newActivities);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert("A name was entered: " + subjectId);
    }
  };

  const getSubjectInfo = () => {
    return "BTX-DEV-" + subjectId;
  };

  const notify = () =>
    toast.error(
      <div>
        <div class="toast-header">
          <strong class="me-auto">Sampling started</strong>
          <small>{new Date().toLocaleTimeString()}</small>
        </div>
      </div>
    );

  return (
    <body className="">
      <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
      </div>
      <section className="">
        <NavBar />
      </section>

      <section className="">
        <div class="container p-5">
          <div class="card shadow rounded border border-3">
            <div class="card-header p-3">
              Operator Workstation for{" "}
              <span class="fw-bold text-uppercase">
                {firebase.auth().currentUser.email}
              </span>
            </div>
            <div class="card-body">
              <Breathe
                socket={breatheSocket}
                compoundDetectionSocket={compoundDetectionSocket}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container p-5">
          <div className="">
            <div className="row">
              <div className="col-7">
                <div className="shadow rounded p-3 border border-3">
                  <ActivityReports activities={activities} />
                </div>
              </div>
              <div className="col-5">
                <div className="shadow rounded p-3 border border-3">
                  <div className="">
                    <h5>Subject Info</h5>
                  </div>

                  <div className="mt-3">
                    <SubjectIdInput
                      onKeyDown={handleKeyDown}
                      onChange={handleChange}
                    />
                    <ControlButtons
                      onAddActivity={handleAddActivity}
                      subjectInfo={getSubjectInfo}
                    />
                  </div>

                  <div className="mt-3">
                    <button className="btn btn-primary">Refresh User</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

export default AnalysisConsole;


