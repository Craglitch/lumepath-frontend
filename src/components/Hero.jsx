import React from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import PartBg from "./PartBg";
import { Link } from 'react-router-dom';

<Link to="/logon">
  <button className="...">Get Started</button>
</Link>

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center px-6 bg-[#0b0b1a]">
      <PartBg />

      {/* Dynamic gradient aura background */}
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
        className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#60a5fa] blur-2xl"
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl text-white">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-6xl sm:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-sky-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        >
          Illuminate Your Path
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed"
        >
          The universe of creation is waiting for your first spark. <br />
          <span className="text-purple-300">Plan.</span>{" "}
          <span className="text-blue-300">Maintain.</span>{" "}
          <span className="text-sky-400">Evolve.</span> — all within{" "}
          <span className="font-semibold text-white">Lumepath</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >



	  {/*./ INI ./Logon ada di src/components/Logon.jsx jangan lupa si bodoh*/}
          <Link to="./Logon"> <button className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.4)]"> Get Started </button> 
          </Link>

	  {/* src/pages/Lm.jsx*/} 
         <Link to="/LearnMore">
	    <button className="px-8 py-3 rounded-xl font-semibold text-white/80 border border-white/20 hover:bg-white/10 backdrop-blur-lg transition-all duration-300">
            Learn More
            </button> 
	  </Link>

      {/* src/pages/ThreadList*/} 
         <Link to="/ThreadList">
	    <button className="px-8 py-3 rounded-xl font-semibold text-white/80 border border-white/20 hover:bg-white/10 backdrop-blur-lg transition-all duration-300">
            Forumn
            </button> 
	  </Link>
        </motion.div>
      </div>

      {/* Bottom glow accent */}
      <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-purple-600/20 via-blue-500/10 to-transparent blur-3xl" />
    </section>
  );
}

