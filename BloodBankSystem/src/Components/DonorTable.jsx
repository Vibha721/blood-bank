import React from "react";

const DonorTable = ({ donors }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Donor List</h3>
        <input
          className="border rounded-lg p-2 text-sm"
          placeholder="Search donors..."
        />
      </div>

      <table className="w-full text-left">
        <thead className="text-sm text-gray-500 border-b">
          <tr>
            <th className="py-3">Name</th>
            <th className="py-3">Blood</th>
            <th className="py-3">Last Donation</th>
            <th className="py-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {donors.map((donor, index) => (
            <tr key={index} className="border-t hover:bg-rose-50">
              <td className="py-3">{donor.name}</td>
              <td>{donor.blood}</td>
              <td>{donor.lastDonation}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    donor.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {donor.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonorTable;
