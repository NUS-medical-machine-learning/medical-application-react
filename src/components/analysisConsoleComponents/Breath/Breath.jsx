import React, { useState, useEffect } from "react";
// import { BreathProvider } from "../../stores/Breath/BreathStore";
import BreatheTimeSeriesContainer from "./TimeSeriesContainer/BreathTimeSeriesContainer";

export default function Breathe({ socket, compoundDetectionSocket }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, [windowWidth]);

  return (
    <div className="col-lg-8">
        <div className="bg-white shadow text-dark rounded p-3">
        <BreatheTimeSeriesContainer
          socket={compoundDetectionSocket}
          //height="50%"
          //height={UIState.heights.breatheHeight}
        />
      </div>
    </div>
  );
}
