import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Logon() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const url = isLogin
      ? "/api/auth/login"
      : "/api/auth/signup";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setMessage(
        isLogin
          ? "✅ Login successful! Redirecting..."
          : "🎉 Account created! You can now log in."
      );
      if (isLogin) setTimeout(() => (window.location.href = "/"), 1500);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#0b0b1a] text-white">
      {/* Animated gradient aura */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(124,58,237,0.25),_transparent_60%),_radial-gradient(circle_at_80%_80%,_rgba(96,165,250,0.25),_transparent_60%)] blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0.1, scale: 1 }}
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.02, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#60a5fa] blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-[0_0_40px_rgba(99,102,241,0.25)]"
      >
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-sky-400">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <div className="flex justify-center mb-8 space-x-3">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              isLogin
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                : "bg-transparent border border-white/20 text-gray-300 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              !isLogin
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                : "bg-transparent border border-white/20 text-gray-300 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            {loading ? (isLogin ? "Signing In..." : "Creating...") : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-200">{message}</p>
        )}
      </motion.div>
    </section>
  );
}

