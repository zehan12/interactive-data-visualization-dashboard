import React from 'react';
import { Bar } from 'react-chartjs-2';

const HorizontalBarChart = () => {
  const data1 = [
    { Day: '4/10/2022', Age: '15-25', Gender: 'Male', A: '877', B: '297' },
    { Day: '4/10/2022', Age: '>25', Gender: 'Male', A: '658', B: '950' },
    { Day: '4/10/2022', Age: '15-25', Gender: 'Female', A: '450', B: '685' },
    { Day: '4/10/2022', Age: '>25', Gender: 'Female', A: '933', B: '348' },
    { Day: '5/10/2022', Age: '15-25', Gender: 'Male', A: '429', B: '240' },
    { Day: '5/10/2022', Age: '>25', Gender: 'Male', A: '228', B: '247' },
    { Day: '5/10/2022', Age: '15-25', Gender: 'Female', A: '167', B: '512' },
    { Day: '5/10/2022', Age: '>25', Gender: 'Female', A: '405', B: '588' },
    { Day: '6/10/2022', Age: '15-25', Gender: 'Male', A: '436', B: '389' },
    { Day: '6/10/2022', Age: '>25', Gender: 'Male', A: '256', B: '115' },
    { Day: '6/10/2022', Age: '15-25', Gender: 'Female', A: '751', B: '875' },
    { Day: '6/10/2022', Age: '>25', Gender: 'Female', A: '745', B: '500' },
    { Day: '7/10/2022', Age: '15-25', Gender: 'Male', A: '114', B: '566' },
    { Day: '7/10/2022', Age: '>25', Gender: 'Male', A: '767', B: '536' },
    { Day: '7/10/2022', Age: '15-25', Gender: 'Female', A: '449', B: '509' },
  ];

  const labels = data1.map(item => `${item.Age}, ${item.Gender}`);
  const dataA = data1.map(item => parseInt(item.A));
  const dataB = data1.map(item => parseInt(item.B));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'A',
        data: dataA,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'B',
        data: dataB,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Horizontal Bar Chart',
      },
    },
  };

  return (
    <div>
      <h1>Horizontal Bar Chart</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
