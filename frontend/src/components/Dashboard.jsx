import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import api from '../api';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [heartRateData, setHeartRateData] = useState({ labels: [], data: [] });

  useEffect(() => {
    api
      .get("strava/data/")
      .then((response) => {
        setActivities(response.data);

        const heartRateData = response.data
          .filter((activity) => activity.has_heartrate && activity.average_heartrate)
          .map((activity) => ({
            heartrate: activity.average_heartrate,
            timestamp: new Date(activity.start_date).toLocaleString(),
          }));

        setHeartRateData({
          labels: heartRateData.map((d) => d.timestamp),
          data: heartRateData.map((d) => d.heartrate),
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      });
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const chartData = {
    labels: heartRateData.labels,
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: heartRateData.data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} bpm`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Heart Rate (bpm)' }, beginAtZero: true },
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Heart Rate Over Time</h1>
        {heartRateData.labels.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg p-4">
            <Line key={JSON.stringify(chartData)} data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p>No heart rate data available</p>
        )}
      </div>
      <div className="flex-1 overflow-y-auto max-h-screen">
        <h1 className="text-2xl font-bold mb-4">Activities</h1>
        {error && <p className="text-red-500">{error}</p>}
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
              <h2 className="text-xl font-semibold">{activity.name}</h2>
              <p><strong>Type:</strong> {activity.type}</p>
              <p><strong>Sport Type:</strong> {activity.sport_type}</p>
              <p><strong>Distance:</strong> {activity.distance} meters</p>
              <p><strong>Time:</strong> {formatTime(activity.moving_time)}</p>
              <p><strong>Start Date:</strong> {new Date(activity.start_date).toLocaleString()}</p>
              <p><strong>Average Speed:</strong> {activity.average_speed} m/s</p>
              <p><strong>Total Elevation Gain:</strong> {activity.total_elevation_gain} meters</p>
              {activity.has_heartrate && (
                <p><strong>Heart Rate:</strong> {activity.average_heartrate} bpm</p>
              )}
            </div>
          ))
        ) : (
          <p>No activities found</p>
        )}
      </div>

      
    </div>
  );
};

export default Dashboard;
