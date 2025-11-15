import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear cookie/token
    await fetch("/api/auth/logout", { 
      method: "POST",
      credentials: "include" 
    });
    
    // Redirect to login
    navigate("/login");
  };

  return (
    <section className="min-h-screen px-6 py-24 bg-[#0b0b1a] text-white">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Profile</h1>
        
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
