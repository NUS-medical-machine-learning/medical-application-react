import React, { useRef, useEffect, useState } from "react";
// import { COMPOUND_DETECTION_SERVICE_URL } from "../../../../apiCalls/common";
// import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

const labels = new Array(12).fill(0);

const dataset = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 0),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => 0),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const addData = (chart, label, data) => {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(data);
  chart.data.datasets[1].data.push(0);
};

const removeData = (chart) => {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.shift();
  });
};

const updateData = (chart, label, data) => {
  removeData(chart);
  addData(chart, label, data);
  chart.update();
};

export default function BreathTimeSeriesContainer({ socket }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    socket.on("detection", ({ data }) => {
      console.log(data);
      console.log(data.scores[0][0][0]);
      updateData(chart, data.scores[0][0][0], data.scores[0][1][0]);
    });
  }, []); //eslint-disable-line

  return <Line ref={chartRef} options={options} data={dataset} />;
}
