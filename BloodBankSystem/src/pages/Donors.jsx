import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchDonors, deleteDonor } from "../api/api";

export default function Donors() {
  const [search, setSearch] = useState("");
  
  // Debug: Log search state changes
  useEffect(() => {
    console.log('Search state changed to:', search);
  }, [search]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    try {
      setLoading(true);
      console.log('Fetching donors...');
      console.log('API URL:', import.meta.env.VITE_API_URL);
      const data = await fetchDonors();
      console.log('Donors fetched:', data);
      console.log('Number of donors:', data ? data.length : 'No data');
      setDonors(data || []);
    } catch (err) {
      setError("Failed to load donors");
      console.error('Error loading donors:', err);
      console.error('Error details:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        await deleteDonor(id);
        setDonors(donors.filter(d => d._id !== id));
        alert("Donor deleted successfully");
      } catch (err) {
        alert("Failed to delete donor");
        console.error(err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filtered = donors.filter(d => {
    const searchLower = search.toLowerCase();
    const matches = 
      (d.name && d.name.toLowerCase().includes(searchLower)) ||
      `${d.firstName || ''} ${d.lastName || ''}`.toLowerCase().includes(searchLower) ||
      (d.email && d.email.toLowerCase().includes(searchLower)) ||
      (d.donor_id && d.donor_id.toLowerCase().includes(searchLower)) ||
      (d.city && d.city.toLowerCase().includes(searchLower)) ||
      (d.blood_group && d.blood_group.toLowerCase().includes(searchLower)) ||
      (d.bloodType && d.bloodType.toLowerCase().includes(searchLower)) ||
      (d.contact_number && d.contact_number.includes(search)) ||
      (d.contact && d.contact.includes(search));
    
    if (search && matches) {
      console.log('Search match found:', d.name, 'for search:', search);
    }
    return matches;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-rose-700">Donors ({donors.length})</h1>
        {search && (
          <div className="text-sm text-gray-600">
            Showing {filtered.length} of {donors.length} donors
          </div>
        )}
        <div className="text-xs text-gray-500">
          Debug: Search value = "{search}", Filtered count = {filtered.length}, Total donors = {donors.length}
        </div>
        <button
          onClick={() => {
            console.log('Test button clicked - setting search to "kimberly"');
            setSearch('kimberly');
          }}
          className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded"
        >
          Test Search
        </button>
        <button
          onClick={() => {
            console.log('Clear all button clicked');
            setSearch('');
          }}
          className="ml-2 px-2 py-1 bg-gray-500 text-white text-xs rounded"
        >
          Clear All
        </button>
        <Link
          to="/register"
          className="bg-rose-500 text-white px-4 py-2 rounded-lg shadow hover:bg-rose-600"
        >
          + Add Donor
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">
          Search Donors
        </label>
        <div className="relative">
          <input
            id="search-input"
            type="text"
            placeholder="Search by name, email, donor ID, city, blood group, or contact..."
            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
            value={search}
            onChange={(e) => {
              console.log('Search input changed:', e.target.value);
              setSearch(e.target.value);
            }}
            onFocus={() => console.log('Search input focused')}
            onBlur={() => console.log('Search input blurred')}
            style={{ minHeight: '48px' }}
          />
          {search && (
            <button
              onClick={() => {
                console.log('Clear search clicked');
                setSearch('');
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-sm text-gray-500 bg-gray-50">
              <tr>
                <th className="py-3 px-2">Donor ID</th>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">Contact</th>
                <th className="py-3 px-2">City</th>
                <th className="py-3 px-2">Blood Group</th>
                <th className="py-3 px-2">Availability</th>
                <th className="py-3 px-2">Months Since First</th>
                <th className="py-3 px-2">Donations</th>
                <th className="py-3 px-2">Pints Donated</th>
                <th className="py-3 px-2">Created At</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="12" className="py-8 text-center text-gray-500">
                  Loading donors...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="12" className="py-8 text-center text-gray-500">
                  {search ? "No donors found matching your search" : "No donors registered yet"}
                </td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr key={d._id} className="border-t hover:bg-rose-50">
                  <td className="py-3 px-2 font-mono text-xs">{d.donor_id || 'N/A'}</td>
                  <td className="py-3 px-2 font-medium">{d.name || `${d.firstName || ''} ${d.lastName || ''}`.trim()}</td>
                  <td className="py-3 px-2 text-sm">{d.email || 'N/A'}</td>
                  <td className="py-3 px-2 text-sm">{d.contact_number || d.contact}</td>
                  <td className="py-3 px-2 text-sm">{d.city || 'N/A'}</td>
                  <td className="py-3 px-2">
                    <span className="font-semibold text-rose-600">
                      {d.blood_group || d.bloodType}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        d.availability === "Available"
                          ? "bg-green-100 text-green-700"
                          : d.availability === "Busy"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {d.availability || 'N/A'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm">{d.months_since_first_donation || 0}</td>
                  <td className="py-3 px-2 text-sm">{d.number_of_donation || d.donationCount || 0}</td>
                  <td className="py-3 px-2 text-sm">{d.pints_donated || 0}</td>
                  <td className="py-3 px-2 text-sm">{formatDate(d.createdAt)}</td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => handleDelete(d._id)}
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
    </div>
  );
}
