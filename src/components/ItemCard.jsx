import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/**
 * Universal item card for habits & tasks
 * Props:
 * - item: { _id, title, description, completed }
 * - onDone: function(id)
 * - color: "cyan" | "indigo"
 */
export default function ItemCard({ item, onDone, color = "cyan" }) {
  const accent =
    color === "cyan"
      ? "from-cyan-500/20 to-blue-500/10 border-cyan-500/20"
      : "from-indigo-500/20 to-purple-500/10 border-indigo-500/20";

  return (
    <motion.div
      key={item._id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 rounded-2xl border bg-gradient-to-br ${accent} shadow-lg`}
    >
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold ${
            item.completed ? "line-through text-gray-400" : "text-white"
          }`}
        >
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-300 mt-1">{item.description}</p>
        )}
      </div>

      <button
        onClick={() => onDone(item._id)}
        disabled={item.completed}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          item.completed
            ? "bg-green-600/60 text-white cursor-default"
            : "bg-white/10 hover:bg-white/20 text-white"
        }`}
      >
        {item.completed ? (
          <>
            <CheckCircle2 className="w-4 h-4" /> Done
          </>
        ) : (
          "Mark Done"
        )}
      </button>
    </motion.div>
  );
}

