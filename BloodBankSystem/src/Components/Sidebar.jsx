import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/donors", label: "Donors" },
    { to: "/inventory", label: "Inventory" },
    { to: "/requests", label: "Requests" },
    { to: "/drives", label: "Drives" },
    { to: "/register", label: "Register" }, 
  ];

  return (
    <aside className="w-64 bg-rose-50 border-r p-6 flex flex-col shadow-lg">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-rose-200 flex items-center justify-center shadow">
          <span className="text-rose-700 font-bold text-lg">💉</span>
        </div>
        <div>
          <div className="font-bold text-xl text-rose-700">LifeLine</div>
          <div className="text-xs text-gray-400">Blood Bank</div>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`block p-3 rounded-lg font-medium ${
              pathname === to
                ? "bg-rose-100 text-rose-700 shadow-sm"
                : "hover:bg-pink-50"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
