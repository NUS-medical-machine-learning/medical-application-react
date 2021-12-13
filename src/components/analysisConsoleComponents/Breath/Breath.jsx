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
    <section
      className="breathe-main-section"
    >
      <div className="breathe-time-series-wrapper">
        <BreatheTimeSeriesContainer
          socket={compoundDetectionSocket}
          //height="50%"
          //height={UIState.heights.breatheHeight}
        />
      </div>
    </section>
  );
}
