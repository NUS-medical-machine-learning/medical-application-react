import React, { useState } from 'react';
import NavBar from "./navbar";
import SubjectInfo from "./subjectInfoBar";
import InfoConsoles from "./infoConsoles";
import useSocket from "../../helpers/Hooks/useSocket";
import {
  BREATH_INLET_ROOT_URL,
  COMPOUND_DETECTION_ROOT_URL,
} from "../../apiCalls/common";
import { Status } from "./Activities/activityReport";

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

  const [value, setValue] = useState(" ");
  const [activities, setActivities] = useState([
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Started },
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Stopped },
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Sending },
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Negative },
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Positive },
      ])

  const handleChange = (event) => {
    setValue(event.target.value);
  }

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
      alert("A name was entered: " + this.props.value);
      event.preventDefault();
    }
  };

  const getSubjectInfo = () => {
    return "BTX-DEV-" + value;
  }
    
  return (
    <body className="">
      <NavBar />

      <SubjectInfo
        subjectInfo={getSubjectInfo}
        onKeyDown={handleKeyDown}
        onAddActivity={handleAddActivity}
        onChange={handleChange}
      />

      <InfoConsoles
        activities={activities}
        breatheSocket={breatheSocket}
        compoundDetectionSocket={compoundDetectionSocket}
      />
    </body>
  );
}

export default AnalysisConsole;
