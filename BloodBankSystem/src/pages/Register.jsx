import React, { useState } from "react";
import { addDonor } from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    city: "",
    address: "",
    dob: "",
    bloodType: "",
    weight: "",
    gender: "",
    emergencyName: "",
    emergencyPhone: "",
    medicalHistory: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const donorData = {
        // Required schema fields
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        city: formData.city,
        contact_number: formData.contact,
        blood_group: formData.bloodType,
        // Backward compatibility fields still used in UI
        contact: formData.contact,
        address: formData.address,
        dob: formData.dob,
        bloodType: formData.bloodType,
        weight: Number(formData.weight),
        gender: formData.gender,
        emergencyName: formData.emergencyName,
        emergencyPhone: formData.emergencyPhone,
        medicalHistory: formData.medicalHistory,
      };

      await addDonor(donorData);
      alert("Donor registered successfully!");
      navigate("/donors");
    } catch (err) {
      setError(err.message || "Failed to register donor. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F8] flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-rose-600">
          Register as a Donor
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="emergencyName"
              placeholder="Emergency Contact Name"
              value={formData.emergencyName}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="text"
              name="emergencyPhone"
              placeholder="Emergency Contact Phone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <textarea
            name="medicalHistory"
            placeholder="Medical history or current medications"
            value={formData.medicalHistory}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="w-4 h-4"
              required
            />
            I agree to the terms and conditions
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 disabled:bg-rose-300 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register as Donor"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
