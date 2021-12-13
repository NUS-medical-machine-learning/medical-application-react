import React, { useRef, useEffect, useState } from "react";
import { COMPOUND_DETECTION_SERVICE_URL } from "../../../../apiCalls/common";
import axios from "axios";

import { initSciChart } from "./BreathTimeSeries";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { NumberRange } from "scichart/Core/NumberRange";
import { EZoomState } from "scichart/types/ZoomState";

export default function BreathTimeSeriesContainer({ socket, height }) {

  const refreshRef = useRef();
  const logLinearRef = useRef();
  const durationRef = useRef();
  const howLongPointsExistRef = useRef();
  const pauseRef = useRef();
  const sciChart = useRef();
  const [wasmContext, setWasmContext] = useState(); //eslint-disable-line
  const breatheColorsRef = useRef();
  const suspendedRef = useRef();

  breatheColorsRef.current = JSON.parse(
    window.sessionStorage.getItem("breatheColors")
  )
    ? JSON.parse(window.sessionStorage.getItem("breatheColors"))
    : [
        "#877bc1",
        "#d34c3d",
        "#2865cc",
        "#ff8c00",
        "#8e398e",
        "#17a5c4",
        "#ed9325",
        "#408387",
        "#da292a",
        "#2f84ff",
        "#8d31bf",
        "#038221",
        "#fbd95f",
        "#11db8d",
        "#877bc1",
        "#d34c3d",
        "#2865cc",
        "#ff8c00",
        "#8e398e",
        "#17a5c4",
        "#ed9325",
        "#408387",
        "#da292a",
        "#2f84ff",
        "#8d31bf",
        "#038221",
      ];

  logLinearRef.current = "Linear";
  refreshRef.current = 0.1;
  durationRef.current = 30000;
  howLongPointsExistRef.current = 1000;
  pauseRef.current = false;

  const STROKE_THICKNESS = 3;

  useEffect(() => {
    (async () => {
      const res = await initSciChart();
      let wasm = res.wasmContext;
      let scs = res.sciChartSurface;

      createInitialDatasets(scs, wasm);

      sciChart.current = scs;
      setWasmContext(wasm);
    })();

    return () => {
      sciChart.current.delete();
    };
  }, []); //eslint-disable-line

  const createInitialDatasets = (sciChart, wasmContext) => {
    axios
      .get(`${COMPOUND_DETECTION_SERVICE_URL}/compounds`)
      .then(({ data: { compounds } }) => {
        compounds.forEach((compound, index) => {
          const newDataSeries = new XyDataSeries(wasmContext, {
            dataSeriesName: compound,
          });
          for (let i = 0; i < 1; i++) {
            newDataSeries.append(0, 0);
          }
          const color = breatheColorsRef.current[index];
          const newLineSeries = new FastLineRenderableSeries(wasmContext, {
            stroke: color,
            strokeThickness: STROKE_THICKNESS,
            dataSeries: newDataSeries,
          });
          newLineSeries.isVisible = true;
          sciChart.renderableSeries.add(newLineSeries);
        });

        const peakDetection = new XyDataSeries(wasmContext, {
          dataSeriesName: "Breath Detection",
        });
        for (let i = 0; i < 1; i++) {
          peakDetection.append(0, 0);
        }
        const peakLineSeries = new FastLineRenderableSeries(wasmContext, {
          stroke: "#fbd95f",
          strokeThickness: 6,
          dataSeries: peakDetection,
        });
        peakLineSeries.isVisible = true;
        sciChart.renderableSeries.add(peakLineSeries);
      })
      .catch((err) => console.log(err, "Error Initializing Breathe Chart"));
  };

  useEffect(() => {
    socket.on("detection", ({ data }) => {
      if (
        sciChart.current.renderableSeries &&
        !pauseRef.current &&
        data.scores
      ) {
        // pause re-rending until entire loop is finished
        if (!suspendedRef.current) {
          suspendedRef.current = sciChart.current.suspendUpdates();
        }

        try {
          sciChart.current.renderableSeries.items.forEach((item, index) => {
            if (data?.scores[index]) {
              // COMPOUND SCORES - array of values
              // append new data
              item.dataSeries.appendRange(
                data.scores[index][0],
                data.scores[index][1]
              );
              // if we have exceeded the specified dataset size limit, remove the same # points
              let batchLength = data.scores[index][0].length;
              if (item.dataSeries.count() > howLongPointsExistRef.current) {
                item.dataSeries.removeRange(0, batchLength);
              }
            } else {
              // MAX SCORE - single value
              // append new data
              item.dataSeries.appendRange(
                [data.scores[0][0][0]],
                [data.maxEventScore]
              );
              // if we have exceeded the specified dataset size limit, remove a single point
              if (item.dataSeries.count() > howLongPointsExistRef.current) {
                // score history will be *=batchLength longer than necessary but is OK
                item.dataSeries.removeAt(0);
              }
            }
          });

          if (
            sciChart.current.zoomState !== EZoomState.UserZooming &&
            !pauseRef.current &&
            sciChart.current.xAxes
          ) {
            sciChart.current.xAxes.items[0].visibleRange = new NumberRange(
              data.scores[0][0][0] - 30, // show last 30 seconds
              data.scores[0][0][0]
            );
          }
        } finally {
          if (!document.hidden && suspendedRef.current) {
            suspendedRef.current.resume();
            suspendedRef.current = false;
          }
        }
      }
    });
  }, []); //eslint-disable-line

  return (
      <div
        className="breathe-time-series-container"
        id="scichart-root"
        ref={sciChart}
      ></div>
  );
}
