// src/components/AIChatRedirect.jsx
import React from "react";
import { motion } from "framer-motion";
import { ChatBubbleLeftRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function AIChatRedirect({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: [-100, 100] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      />
      
      <div className="relative z-10 flex items-center space-x-2">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <SparklesIcon className="w-5 h-5" />
        </motion.div>
        <span>Try AI Assistant</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ChatBubbleLeftRightIcon className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.button>
  );
}
