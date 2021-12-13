import React, { useRef, useEffect, useState } from "react";
import "chartjs-adapter-moment";
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
  TimeScale,
  TimeSeriesScale
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale
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
  scales: {
    x: {
      type: "time",
      time: {
        unit: "minute",
      },
    },
  },
};

// const labels = new Array(12).fill(new Date(Date.now()).toLocaleTimeString("en-US", {
//         hour12: false,
//       }));

// const OneToTwelve = Array.from(Array(12).keys());

// const labels = Array.from(Array(12).keys()).map(
//   (number) => new Date(Date.now() + number * number * 60000)
// );

// const labels = Array.from(Array(12).keys()).map(
//   (number) => Date.now()
// );

// const labels = Array.from(Array(10).keys());

const dataset = {
  labels: [],
  datasets: [
    {
      label: "Acetone",
      data: [],
      borderColor: "rgb(255, 99, 132)", //Red
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Breath Detection",
      data: [],
      borderColor: "rgb(53, 162, 235)", //Blue
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
  if (chart.data.labels.length > 12) {
    removeData(chart);
  } 
  addData(chart, label, data);
  chart.update();
};

export default function BreathTimeSeriesContainer({ socket }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    socket.on("detection", ({ data }) => {
      const unixTimestamp = data.scores[0][0][0];
      const date = new Date(unixTimestamp);
      updateData(chart, date, data.scores[0][1][0]);
    });
  }, []);

  return <Line ref={chartRef} options={options} data={dataset} />;
}
