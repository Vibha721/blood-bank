import React, { useState } from "react";
import { addDrive } from "../api/api";
import { useNavigate } from "react-router-dom";

function AddDrive() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    organizer: "",
    contactNumber: "",
    expectedDonors: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const driveData = {
        name: formData.name,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        organizer: formData.organizer,
        contactNumber: formData.contactNumber,
        expectedDonors: Number(formData.expectedDonors),
        description: formData.description,
      };

      console.log("Submitting drive data:", driveData);
      const result = await addDrive(driveData);
      console.log("Drive created successfully:", result);
      alert("Drive organized successfully!");
      navigate("/drives");
    } catch (err) {
      setError(err.message || "Failed to organize drive. Please try again.");
      console.error("Drive creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F8] flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-rose-600">
          Organize Blood Donation Drive
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Drive Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <input
            type="text"
            name="organizer"
            placeholder="Organizer Name"
            value={formData.organizer}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="number"
            name="expectedDonors"
            placeholder="Expected Number of Donors"
            value={formData.expectedDonors}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
            min="1"
          />
          <textarea
            name="description"
            placeholder="Drive Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            rows="4"
          />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/drives")}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 disabled:bg-rose-300 disabled:cursor-not-allowed"
            >
              {loading ? "Organizing..." : "Organize Drive"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDrive;
