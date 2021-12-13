import React, { useRef, useEffect, useState } from "react";
import { COMPOUND_DETECTION_SERVICE_URL } from "../../../../apiCalls/common";
import axios from "axios";


export default function BreathTimeSeriesContainer({ socket }) {

  useEffect(() => {
    socket.on("detection", ({ data }) => {
      console.log(data)
    });
  }, []); //eslint-disable-line

  return (
      <div
        className="breathe-time-series-container"
        id="scichart-root"
      ></div>
  );
}
