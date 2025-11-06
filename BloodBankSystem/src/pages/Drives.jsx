import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchDrives, updateDrive, deleteDrive } from "../api/api";

const Drives = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDrives();
  }, [location]);

  const loadDrives = async () => {
    try {
      setLoading(true);
      const data = await fetchDrives();
      setDrives(data);
    } catch (err) {
      setError("Failed to load drives");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDrive(id, { status: newStatus });
      setDrives(drives.map(d => 
        d._id === id ? { ...d, status: newStatus } : d
      ));
    } catch (err) {
      alert("Failed to update drive status");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this drive?")) {
      try {
        await deleteDrive(id);
        setDrives(drives.filter(d => d._id !== id));
        alert("Drive deleted successfully");
      } catch (err) {
        alert("Failed to delete drive");
        console.error(err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const upcoming = drives.filter(d => 
    d.status === "Upcoming" || d.status === "Ongoing"
  );
  
  const past = drives.filter(d => 
    d.status === "Completed" || d.status === "Cancelled"
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-rose-600">Blood Donation Drives</h2>
        <button
          onClick={() => navigate("/drives/add")}
          className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
        >
          + New
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Upcoming Drives */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-3">Upcoming Drives ({upcoming.length})</h3>
        {loading ? (
          <p className="text-gray-500">Loading drives...</p>
        ) : upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming drives scheduled</p>
        ) : (
          <div className="space-y-3">
            {upcoming.map((drive) => (
              <div key={drive._id} className="p-4 border rounded-lg hover:bg-rose-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{drive.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      📍 {drive.location}
                    </div>
                    <div className="text-sm text-gray-600">
                      📅 {formatDate(drive.date)} • 🕐 {drive.time}
                    </div>
                    <div className="text-sm text-gray-600">
                      👤 Organizer: {drive.organizer} • 📞 {drive.contactNumber}
                    </div>
                    <div className="text-sm text-gray-600">
                      Expected Donors: {drive.expectedDonors} | Actual: {drive.actualDonors}
                    </div>
                    {drive.description && (
                      <div className="text-sm text-gray-500 mt-2">{drive.description}</div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <select
                      value={drive.status}
                      onChange={(e) => handleStatusChange(drive._id, e.target.value)}
                      className="px-3 py-1 rounded-lg text-sm border"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleDelete(drive._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Drives */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-3">Past Drives ({past.length})</h3>
        {loading ? (
          <p className="text-gray-500">Loading drives...</p>
        ) : past.length === 0 ? (
          <p className="text-gray-500">No past drives</p>
        ) : (
          <div className="space-y-3">
            {past.map((drive) => (
              <div key={drive._id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold">{drive.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      📍 {drive.location} • 📅 {formatDate(drive.date)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Donors: {drive.actualDonors} / {drive.expectedDonors}
                    </div>
                    <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                      drive.status === "Completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {drive.status}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(drive._id)}
                    className="text-red-600 hover:text-red-800 text-sm ml-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drives;
