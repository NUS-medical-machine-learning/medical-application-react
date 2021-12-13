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
import faker from "faker";

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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const dataset = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
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

// export function App() {
//   return <Line options={options} data={data} />;
// }

const resetData = () => {
  dataset = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
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
};

const addData = (chart, label, data) => {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(data);
  chart.data.datasets[1].data.push(0);
};

const removeData = (chart) => {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });

}

const updateData = (chart, label, data) => {
  addData(chart, label, data);
  removeData(chart);
  chart.update();
}

export default function BreathTimeSeriesContainer({ socket }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    socket.on("detection", ({ data }) => {
      console.log(data);
      updateData(chart, "Hello", 1);
    });
  }, []); //eslint-disable-line

  return <Line ref={chartRef} options={options} data={dataset} />;
}
