import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ selectedOption, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (selectedOption && data) {
      const filtered = data.map((entry) => ({
        Day: entry.Day,
        Time: entry[selectedOption],
      }));
      setFilteredData(filtered);
      setLoading(false);
    }
  }, [selectedOption, data]);

  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: `Time Trend for Feature ${selectedOption}`,
      align: "left",
    },
    xaxis: {
      categories: filteredData.map((entry) => entry.Day),
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
        },
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ReactApexChart
          options={chartOptions}
          series={[
            {
              name: selectedOption,
              data: filteredData.map((entry) => entry.Time),
            },
          ]}
          type="line"
          height={600}
        />
      )}
    </>
  );
};

export default LineChart;
