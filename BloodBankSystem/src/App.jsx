// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import Inventory from "./pages/Inventory";
import Requests from "./pages/Requests";
import Drives from "./pages/Drives";
import Register from "./pages/Register";
import AddDrive from "./pages/AddDrive";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/drives" element={<Drives />} />
          <Route path="/drives/add" element={<AddDrive />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}
