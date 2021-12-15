import React, { useState, useEffect } from "react";
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
        />
      </div>
    </div>
  );
}
