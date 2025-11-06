import React, { useState, useEffect } from "react";
import { fetchDonors } from "../api/api";

const DonorsList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDonors = async () => {
      try {
        setLoading(true);
        const data = await fetchDonors();
        setDonors(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch donors. Please try again later.");
        console.error("Error fetching donors:", err);
      } finally {
        setLoading(false);
      }
    };

    getDonors();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center h-64">
        <div className="text-rose-600">Loading donors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Donor List</h3>
        <div className="text-sm text-gray-500">Total: {donors.length} donors</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-500 border-b">
            <tr>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Blood Type</th>
              <th className="py-3 px-2">Contact</th>
              <th className="py-3 px-2">Last Donation</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {donors.length > 0 ? (
              donors.map((donor) => (
                <tr key={donor._id} className="border-t hover:bg-rose-50">
                  <td className="py-3 px-2">{donor.name || `${donor.firstName || ''} ${donor.lastName || ''}`.trim()}</td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-full">
                      {donor.blood_group || donor.bloodType}
                    </span>
                  </td>
                  <td className="py-3 px-2">{donor.contact_number || donor.contact}</td>
                  <td className="py-3 px-2">{new Date(donor.lastDonation).toLocaleDateString()}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        donor.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : donor.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {donor.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No donors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorsList;