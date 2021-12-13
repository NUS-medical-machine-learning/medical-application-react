import React from "react";
import NavBar from "./navbar";
import SubjectInfo from "./subjectInfoBar";
import InfoConsoles from "./infoConsoles";
import useSocket from "../../helpers/Hooks/useSocket";
import {
  BREATH_INLET_ROOT_URL,
  COMPOUND_DETECTION_ROOT_URL,
} from "../../apiCalls/common";

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

  return (
    <div>
      <NavBar />

      <SubjectInfo />

      <InfoConsoles
        breatheSocket={breatheSocket}
        compoundDetectionSocket={compoundDetectionSocket}
      />
    </div>
  );
}

// class AnalysisConsole extends React.Component {
//   render() {
// const [breatheSocket] = useSocket(BREATH_INLET_ROOT_URL);
// const [compoundDetectionSocket] = useSocket(COMPOUND_DETECTION_ROOT_URL);

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
//     } else if (process.env.REACT_APP_SKIN_IN_USE === "MOBILE") {
//       breatheSocket.disconnect();
//       compoundDetectionSocket.disconnect();
//     }

//     return (
//       <div>
//         <NavBar />

//         <SubjectInfo />

//         <InfoConsoles
//           breatheSocket={breatheSocket}
//           compoundDetectionSocket={compoundDetectionSocket}
//         />
//       </div>
//     );
//   }
// }

export default AnalysisConsole;
