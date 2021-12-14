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

  const [value, setCount] = useState("");
  const [activities, setActivities] = useState([
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Started },
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Stopped },
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Sending },
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Negative },
        { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Positive },
      ])

  const handleChange = (event) => {
    setCount(event.target.value);
  }

  const handleAddActivity = ({ s, e }) => {
    const newActivity = { subjectID: s, event: e };
    console.log(newActivity);
    console.log(activities[1]);
    activities.push(newActivity);
    setActivities(activities);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert("A name was entered: " + this.props.value);
      event.preventDefault();
    }
  };
    
  return (
      <div>
        <NavBar />

        <SubjectInfo
          subjectInfo={value}
          onKeyDown={handleKeyDown}
          onAddActivity={handleAddActivity}
          onChange={handleChange}
        />

        <InfoConsoles
          activities={activities}
          breatheSocket={breatheSocket}
          compoundDetectionSocket={compoundDetectionSocket}
        />
      </div>
    );
}

export default AnalysisConsole;

// class AnalysisConsole extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: "",
//       activities: [
//         { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Started },
//         { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Stopped },
//         { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Sending },
//         { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Negative },
//         { subjectID: "BTX-DEV-DEMO-000000006", event: Status.Positive },
//       ],
//     };

//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange = (event) => {
//     this.setState({ value: event.target.value });
//   }

//   handleAddActivity = ({ subjectID, event }) => {
//     const activities = this.state.activities.push({ subjectID, event });
//     this.setState({ activities });
//   };

//   handleKeyDown = (event) => {
//       if (event.key === "Enter") {
//         alert("A name was entered: " + this.props.value);
//         event.preventDefault();
//       }
//     };

//   render() {
//     const [breatheSocket] = useSocket(BREATH_INLET_ROOT_URL);
//     const [compoundDetectionSocket] = useSocket(COMPOUND_DETECTION_ROOT_URL);

//     if (process.env.REACT_APP_SKIN_IN_USE === "TRACK") {
//       breatheSocket.disconnect();
//       compoundDetectionSocket.disconnect();
//     } else if (process.env.REACT_APP_SKIN_IN_USE === "EXPLORE") {
//       breatheSocket.disconnect();
//       compoundDetectionSocket.disconnect();
//     } else if (
//       process.env.REACT_APP_SKIN_IN_USE === "BREATHE" ||
//       process.env.REACT_APP_SKIN_IN_USE === "BREATHE_RD"
//     ) {
//       console.log("BREATHE");
//     } else if (process.env.REACT_APP_SKIN_IN_USE === "MOBILE") {
//       breatheSocket.disconnect();
//       compoundDetectionSocket.disconnect();
//     }
//     return (
//       <div>
//         <NavBar />

//         <SubjectInfo
//           subjectInfo={this.state.value}
//           onKeyDown={this.handleKeyDown}
//           onAddActivity={this.handleAddActivity}
//           onChange={this.handleChange}
//         />

//         <InfoConsoles
//           breatheSocket={breatheSocket}
//           compoundDetectionSocket={compoundDetectionSocket}
//         />
//       </div>
//     );
//   }
// }

// export default AnalysisConsole;
