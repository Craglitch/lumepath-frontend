import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center px-6 bg-[#0b0b1a]">
      {/* Animated blue–purple aura background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(124,58,237,0.25),_transparent_60%),_radial-gradient(circle_at_80%_80%,_rgba(96,165,250,0.25),_transparent_60%)] blur-3xl"
      />

      {/* Animated color layer */}
      <motion.div
        initial={{ opacity: 0.1, scale: 1 }}
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.02, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 blur-2xl"
      />

      {/* Hero Text Content */}
      <div className="relative z-10 mt-32 max-w-3xl text-white">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-sky-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        >
          Prototype v0.1.4 patch
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-lg text-gray-300 mb-12"
        >
          Track your progress and community synergy in perfect harmony.
          Achieve. Connect. <span className="text-purple-300">Evolve.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          <Link to="/logon">
            <button className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              Try-free
            </button>
          </Link>

          <Link to="/learnMore">
            <button className="px-8 py-3 rounded-xl font-semibold text-white/80 border border-white/20 hover:bg-white/10 backdrop-blur-lg transition-all duration-300">
              Learn More
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom glow accent */}
      <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-purple-600/20 via-blue-500/10 to-transparent blur-3xl" />
    </section>
  );
}

