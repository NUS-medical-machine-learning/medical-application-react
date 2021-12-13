import React, { Component } from "react";
import ActivityConsole from "./activityConsole";
// import Graph from "./graph";
import Breathe from "./Breath/Breath";

// const Breath = React.lazy(() => import("./components/Breath/Breath"));

function InfoConsoles({ breatheSocket, compoundDetectionSocket }) {
  return (
    <section className="p-5">
      <div className="container p-0">
        <div className="row g-4">
          <container
            title={"BREATH ANALYSIS"}
            width={"100%"}
            name={"breathe"}
            children={
              <Breathe
                socket={breatheSocket}
                compoundDetectionSocket={compoundDetectionSocket}
              />
            }
          />

          <ActivityConsole />
        </div>
      </div>
    </section>
  );
}

// class InfoConsoles extends Component {
//   render({ breatheSocket, compoundDetectionSocket }) {
//     return (
//       <section className="p-5">
//         <div className="container p-0">
//           <div className="row g-4">
//             <Container
//               title={"BREATH ANALYSIS"}
//               width={"100%"}
//               name={"breathe"}
//               children={
//                 <Breath
//                   socket={breatheSocket}
//                   compoundDetectionSocket={compoundDetectionSocket}
//                 />
//               }
//             />

//             <ActivityConsole />
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

export default InfoConsoles;
