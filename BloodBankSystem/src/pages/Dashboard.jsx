// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, UserPlus, Activity, Droplet, ClipboardList, Calendar } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { fetchDonors, fetchInventory, fetchPendingRequests, fetchUpcomingDrives, getLowStockAlerts } from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalUnits: 0,
    pendingRequests: 0,
    upcomingDrives: 0
  });
  const [bloodTypeData, setBloodTypeData] = useState([]);
  const [recentDonors, setRecentDonors] = useState([]);
  const [upcomingDrives, setUpcomingDrives] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const bloodTypeColors = {
    "A+": "#ef4444", "A-": "#f97316",
    "B+": "#f59e0b", "B-": "#eab308",
    "O+": "#84cc16", "O-": "#22c55e",
    "AB+": "#06b6d4", "AB-": "#3b82f6"
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [donors, inventory, requests, drives, alerts] = await Promise.all([
        fetchDonors().catch(() => []),
        fetchInventory().catch(() => []),
        fetchPendingRequests().catch(() => []),
        fetchUpcomingDrives().catch(() => []),
        getLowStockAlerts(30).catch(() => [])
      ]);

      // Calculate stats
      const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
      
      setStats({
        totalDonors: donors.length,
        totalUnits,
        pendingRequests: requests.length,
        upcomingDrives: drives.length
      });

      // Prepare blood type distribution data
      const chartData = inventory.map(item => ({
        name: item.bloodType,
        value: item.units,
        color: bloodTypeColors[item.bloodType] || "#6b7280"
      }));
      setBloodTypeData(chartData);

      // Get recent donors (last 5)
      setRecentDonors(donors.slice(0, 5));

      // Get upcoming drives (next 2)
      setUpcomingDrives(drives.slice(0, 2));

      // Set low stock alerts
      setLowStockAlerts(alerts);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-8">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Monitor donors, inventory, and requests</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded hover:bg-gray-50">
              <Bell className="w-4 h-4 text-gray-600" /> Notifications
            </button>
            <Link
              to="/register"
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              <UserPlus className="w-4 h-4" /> Add Donor
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded p-6 border shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Activity className="w-4 h-4 text-red-600" /> Total Donors
            </div>
            <div className="text-3xl font-bold text-red-700 mt-2">
              {loading ? "..." : stats.totalDonors}
            </div>
          </div>
          <div className="bg-white rounded p-6 border shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Droplet className="w-4 h-4 text-red-600" /> Blood Units
            </div>
            <div className="text-3xl font-bold text-red-700 mt-2">
              {loading ? "..." : stats.totalUnits}
            </div>
          </div>
          <div className="bg-white rounded p-6 border shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <ClipboardList className="w-4 h-4 text-red-600" /> Pending Requests
            </div>
            <div className="text-3xl font-bold text-red-700 mt-2">
              {loading ? "..." : stats.pendingRequests}
            </div>
          </div>
          <div className="bg-white rounded p-6 border shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar className="w-4 h-4 text-red-600" /> Upcoming Drives
            </div>
            <div className="text-3xl font-bold text-red-700 mt-2">
              {loading ? "..." : stats.upcomingDrives}
            </div>
          </div>
        </div>

        {/* Alerts */}
        {lowStockAlerts.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded p-6">
            <div className="font-semibold text-red-700 flex items-center gap-2">
              ⚠️ Critical Alerts
            </div>
            <ul className="mt-3 text-sm text-red-700 space-y-1">
              {lowStockAlerts.map((alert, index) => (
                <li key={index}>
                  Low stock alert: {alert.bloodType} ({alert.units} units remaining)
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Donor Table + Right Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2 bg-white rounded border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Donor List</h3>
              <input
                className="border rounded p-2 text-sm"
                placeholder="Search donors..."
              />
            </div>

            <table className="w-full text-left border-t">
              <thead className="text-sm text-gray-600">
                <tr>
                  <th className="py-3">Name</th>
                  <th className="py-3">Blood</th>
                  <th className="py-3">Last Donation</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      Loading donors...
                    </td>
                  </tr>
                ) : recentDonors.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      No donors found
                    </td>
                  </tr>
                ) : (
                  recentDonors.map((donor) => (
                    <tr key={donor._id} className="border-t hover:bg-gray-50">
                      <td className="py-4">{donor.name || `${donor.firstName || ''} ${donor.lastName || ''}`.trim()}</td>
                      <td>{donor.blood_group || donor.bloodType}</td>
                      <td>{formatDate(donor.lastDonation)}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          donor.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : donor.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {donor.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded border shadow-sm p-6">
              <div className="font-semibold mb-4 text-gray-800">
                Blood Type Distribution
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={bloodTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bloodTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded border shadow-sm p-6">
              <div className="font-semibold mb-2 text-gray-800">Upcoming Drives</div>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : upcomingDrives.length === 0 ? (
                <p className="text-sm text-gray-500">No upcoming drives</p>
              ) : (
                <ul className="text-sm text-gray-600 space-y-1">
                  {upcomingDrives.map((drive) => (
                    <li key={drive._id}>
                      {drive.location} • {formatDate(drive.date)} • {drive.time}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}
