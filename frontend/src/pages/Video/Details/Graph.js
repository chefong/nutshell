import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import { defaults } from 'react-chartjs-2';

defaults.global.defaultFontFamily = 'Circular';
defaults.global.defaultFontColor = '#656155';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 3,
          stepSize: 1,
        },
        gridLines: {
          color: 'rgba(0, 0, 0, 0.0)',
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 3,
          stepSize: 1,
        },
        gridLines: {
          color: 'rgba(0, 0, 0, 0.0)',
        },
      },
    ],
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
    labels: {
      fontFamily: 'Circular',
    }
  },
};

function Graph(props) {
  const { readingLevels, xLabels } = props;

  const data = {
    labels: xLabels,
    datasets: [
      {
        label: 'Reading level',
        data: readingLevels,
        fill: true,
        backgroundColor: 'rgba(245, 168, 55, 0.15)',
        borderColor: '#F5A837',
      },
    ],
  };

  return (
    <div className="Graph">
      <Line data={data} options={options} height={236} />
    </div>
  );
}

export default Graph;
