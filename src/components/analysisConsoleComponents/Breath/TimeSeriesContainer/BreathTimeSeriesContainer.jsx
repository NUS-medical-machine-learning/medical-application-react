import React, { useEffect } from "react";
import "chartjs-adapter-moment";

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
  TimeSeriesScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

const blueColor = "rgb(13,202,240)";
const blueColorLighter = "rgba(13,202,240,0.5)";

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

const chartAreaBorder = {
  id: "chartAreaBorder",
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  },
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",

      display: true,
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 16,
        },
      },
    },
    chartAreaBorder: {
      borderColor: blueColor,
      borderWidth: 2,
      borderDash: [5, 5],
      borderDashOffset: 2,
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "second",
      },
      title: {
        display: true,
        text: "Time",
        font: {
          size: 16,
        },
      },
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        major: {
          enabled: true,
        },
        font: {
          size: 16,
        },
      },
    },
    y: {
      // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
      suggestedMax: 30,
      suggestedMin: -2,
      ticks: {
        font: {
          size: 16,
        },
      },
    },
  },
};

const dataset = {
  labels: [],
  datasets: [
    {
      label: "Acetone",
      data: [],
      borderColor: blueColor, //Blue
      backgroundColor: blueColorLighter,
    },
    {
      label: "Breath Detection",
      data: [],
      borderColor: "rgb(255, 99, 132)", //Red
      backgroundColor: "rgba(255, 99, 132, 0.5)",
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
  if (chart.data.labels.length > 20) {
    // Render about 10 seconds
    removeData(chart);
  }
  addData(chart, label, data);

  chart.update();
};

export const renewData = (chart) => {
  while (chart.data.labels.length > 0) {
    removeData(chart);
  }
  chart.update();
};

export default function BreathTimeSeriesContainer(props) {
  // const chartRef = useRef(null);

  const chartRef = props.chartRef;
  const socket = props.socket;

  useEffect(() => {
    const chart = chartRef.current;

    console.log("New socket set detection");
    socket.on("detection", ({ data }) => {
      const unixTimestamp = data.scores[0][0][0];
      const date = new Date(unixTimestamp * 1000);
      updateData(chart, date, data.scores[0][1][0]);
    });
  }, [socket, chartRef]);

  return (
    <Line
      className=""
      ref={chartRef}
      options={options}
      data={dataset}
      height={"100px"}
      plugins={[chartAreaBorder]}
    />
  );
}
