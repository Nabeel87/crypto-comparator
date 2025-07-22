import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  Title
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  Title
);

const CompareChart = ({ coin1, coin2, sign }) => {
  if (!coin1 || !coin2) return null;

  const data = {
    labels: ['Current Price', 'All Time High', 'All Time Low'],
    datasets: [
      {
        label: coin1.name,
        data: [coin1.current_price, coin1.ath, coin1.atl],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
      {
        label: coin2.name,
        data: [coin2.current_price, coin2.ath, coin2.atl],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Coin Comparison Chart',
        font: {
          size: 18,
        },
        color: '#333',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${sign}${context.formattedValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#555',
          callback: (value) => `${sign}${value.toLocaleString()}`,
        },
        grid: {
          color: '#e0e0e0',
        },
      },
      x: {
        ticks: {
          color: '#555',
        },
        grid: {
          color: '#f0f0f0',
        },
      },
    },
  };

  return (
    <div style={{ marginTop: 40, padding: '20px', backgroundColor: '#fafafa', borderRadius: '12px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CompareChart;
