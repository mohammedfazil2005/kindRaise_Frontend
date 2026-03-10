import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", donations: 12000 },
  { month: "Feb", donations: 18000 },
  { month: "Mar", donations: 25000 },
  { month: "Apr", donations: 32000 },
  { month: "May", donations: 40000 },
];

const AdminAnalyticsDonationChart = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Monthly Donations
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="donations"
            stroke="#10b981"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminAnalyticsDonationChart;