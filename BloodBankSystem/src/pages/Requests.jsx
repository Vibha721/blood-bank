import React, { useState, useEffect } from "react";
import { fetchRequests, updateRequest, deleteRequest } from "../api/api";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchRequests();
      setRequests(data);
    } catch (err) {
      setError("Failed to load requests");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRequest(id, { status: newStatus });
      setRequests(requests.map(r => 
        r._id === id ? { ...r, status: newStatus } : r
      ));
    } catch (err) {
      alert("Failed to update request status");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await deleteRequest(id);
        setRequests(requests.filter(r => r._id !== id));
        alert("Request deleted successfully");
      } catch (err) {
        alert("Failed to delete request");
        console.error(err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(r => r.status === filter);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-rose-700">Blood Requests ({requests.length})</h1>
        <button
          onClick={loadRequests}
          className="bg-rose-500 text-white px-4 py-2 rounded-lg shadow hover:bg-rose-600"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filter buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all" ? "bg-rose-500 text-white" : "bg-white text-gray-700 border"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Pending")}
          className={`px-4 py-2 rounded-lg ${
            filter === "Pending" ? "bg-rose-500 text-white" : "bg-white text-gray-700 border"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("Fulfilled")}
          className={`px-4 py-2 rounded-lg ${
            filter === "Fulfilled" ? "bg-rose-500 text-white" : "bg-white text-gray-700 border"
          }`}
        >
          Fulfilled
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-500 bg-gray-50">
            <tr>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Blood Type</th>
              <th className="py-3 px-4">Hospital</th>
              <th className="py-3 px-4">Units</th>
              <th className="py-3 px-4">Urgency</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500">
                  Loading requests...
                </td>
              </tr>
            ) : filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500">
                  No requests found
                </td>
              </tr>
            ) : (
              filteredRequests.map((r) => (
                <tr key={r._id} className="border-t hover:bg-rose-50">
                  <td className="py-3 px-4">{r.patient}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-rose-600">{r.bloodType}</span>
                  </td>
                  <td className="py-3 px-4">{r.hospital}</td>
                  <td className="py-3 px-4">{r.units}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      r.urgency === "Critical" ? "bg-red-100 text-red-700" :
                      r.urgency === "High" ? "bg-orange-100 text-orange-700" :
                      r.urgency === "Medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {r.urgency}
                    </span>
                  </td>
                  <td className="py-3 px-4">{formatDate(r.requestDate)}</td>
                  <td className="py-3 px-4">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r._id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs border-0 ${
                        r.status === "Fulfilled"
                          ? "bg-green-100 text-green-700"
                          : r.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Fulfilled">Fulfilled</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
