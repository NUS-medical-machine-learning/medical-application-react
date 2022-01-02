import React, { useState, useEffect } from "react";
import BreatheTimeSeriesContainer from "./TimeSeriesContainer/BreathTimeSeriesContainer";

export default function Breathe(props) {
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
    <BreatheTimeSeriesContainer
      chartRef={props.chartRef}
      socket={props.compoundDetectionSocket}
      // isSamplingReady={props.isSamplingReady}
      // setIsSamplingReady={props.setIsSamplingReady}
    />
  );
}
