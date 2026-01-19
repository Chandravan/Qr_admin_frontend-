import React, { useState, useEffect } from "react";
import { getDashboardStats } from "../Services/api";

const StatCard = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
      {label}
    </p>
    <h3 className={`text-4xl font-black mt-2 ${color}`}>{value}</h3>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, inside: 0, outside: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats(); // API Call
        setStats(res.data); // Backend se data set kiya
      } catch (err) {
        console.error("Stats error:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Total Students"
        value={stats.total}
        color="text-blue-600"
      />
      <StatCard
        label="Currently Inside"
        value={stats.inside}
        color="text-green-600"
      />
      <StatCard
        label="Currently Outside"
        value={stats.outside}
        color="text-orange-600"
      />
    </div>
  );
};

export default Dashboard;
