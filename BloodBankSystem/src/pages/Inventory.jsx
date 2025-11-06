import React, { useState, useEffect } from "react";
import { fetchInventory, getExpiringBatches } from "../api/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [expiringBatches, setExpiringBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const [inventoryData, expiringData] = await Promise.all([
        fetchInventory().catch(() => []),
        getExpiringBatches(30).catch(() => [])
      ]);
      setInventory(inventoryData);
      setExpiringBatches(expiringData);
    } catch (err) {
      setError("Failed to load inventory");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStockStatus = (units) => {
    if (units === 0) return { color: "text-gray-600", bg: "bg-gray-100" };
    if (units < 20) return { color: "text-red-600", bg: "bg-red-50" };
    if (units < 50) return { color: "text-yellow-600", bg: "bg-yellow-50" };
    return { color: "text-green-600", bg: "bg-green-50" };
  };

  return (
    <div className="min-h-screen bg-[#FBF8F8] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blood Inventory</h1>
        <button
          onClick={loadInventory}
          className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Cards showing blood units */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {loading ? (
          <div className="col-span-4 text-center py-8 text-gray-500">
            Loading inventory...
          </div>
        ) : inventory.length === 0 ? (
          <div className="col-span-4 text-center py-8 text-gray-500">
            No inventory data available
          </div>
        ) : (
          inventory.map((item) => {
            const status = getStockStatus(item.units);
            return (
              <div key={item._id} className={`${status.bg} rounded-lg p-6 shadow text-center border`}>
                <div className="text-sm text-gray-600 font-medium">{item.bloodType}</div>
                <div className={`text-3xl font-bold ${status.color} mt-2`}>
                  {item.units}
                </div>
                <div className="text-xs text-gray-500 mt-1">units</div>
              </div>
            );
          })
        )}
      </div>

      {/* Expiry table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-4">Expiring Soon (Next 30 Days)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-sm text-gray-500 bg-gray-50">
              <tr>
                <th className="py-3 px-4">Blood Type</th>
                <th className="py-3 px-4">Units</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Days Remaining</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    Loading expiry data...
                  </td>
                </tr>
              ) : expiringBatches.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No batches expiring in the next 30 days
                  </td>
                </tr>
              ) : (
                expiringBatches.map((batch, index) => {
                  const daysRemaining = Math.ceil((new Date(batch.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                  const isUrgent = daysRemaining <= 7;
                  return (
                    <tr key={index} className={`border-t ${isUrgent ? 'bg-red-50' : ''}`}>
                      <td className="py-3 px-4 font-semibold">{batch.bloodType}</td>
                      <td className="py-3 px-4">{batch.units}</td>
                      <td className="py-3 px-4">{formatDate(batch.expiryDate)}</td>
                      <td className="py-3 px-4">
                        <span className={`${isUrgent ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                          {daysRemaining} days
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
