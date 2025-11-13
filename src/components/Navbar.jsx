import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Habits", path: "/habits" },
    { name: "Tasks", path: "/tasks" },
    { name: "Community", path: "#" },
    { name: "Profile", path: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b0b1a]/80 backdrop-blur-md border-b border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Gradient Logo like Home.jsx */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]"
        >
          Lumepath
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
                  : "text-gray-300 hover:text-indigo-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-purple-300 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#101122]/95 backdrop-blur-lg border-t border-white/10 shadow-inner">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 border-b border-white/5 transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-purple-400 bg-white/5"
                  : "text-gray-300 hover:text-indigo-300 hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

