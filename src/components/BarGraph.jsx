import React from "react";
import ReactApexChart from "react-apexcharts";

const BarGraph = ({ data, onChange }) => {
  const totalTimes = {};

  data.forEach((entry) => {
    Object.keys(entry).forEach((key) => {
      if (key !== "Day" && key !== "Age" && key !== "Gender") {
        totalTimes[key] = (totalTimes[key] || 0) + parseInt(entry[key]);
      }
    });
  });

  const state = {
    series: [
      {
        data: Object.values(totalTimes),
      },
    ],
    options: {
      chart: {
        events: {
          click: (...args) => {
            const { dataPointIndex } = args[2];
            const clickedValue = args[1].w.globals.labels[dataPointIndex];
            onChange(clickedValue);
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: Object.keys(totalTimes),
      },
    },
  };

  return (
    <>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={600}
      />
    </>
  );
};

export default BarGraph;
