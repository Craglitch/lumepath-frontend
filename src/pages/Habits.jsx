import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ItemCard from "../components/ItemCard";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [summary, setSummary] = useState({ total: 0, done: 0, percent: 0 });

  const fetchHabits = async () => {
    const res = await axios.get("/api/habits/show");
    setHabits(res.data);
    const sum = await axios.get("/api/habits/summary");
    setSummary(sum.data);
  };

  const addHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    await axios.post("/api/habits/add", { title: newHabit });
    setNewHabit("");
    fetchHabits();
  };

  const handleDone = async (id) => {
    await axios.put(`/api/habits/done/${id}`);
    fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <section className="min-h-screen px-6 py-24 bg-[#0b0b1a] text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Habit Tracker
          </h1>
          <p className="text-gray-400">Build consistency one day at a time.</p>
        </div>

        {/* Summary */}
        <motion.div
          className="flex justify-between items-center bg-white/5 rounded-xl p-4 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span>Total: {summary.total}</span>
          <span>Completed: {summary.done}</span>
          <span>Progress: {summary.percent}%</span>
        </motion.div>

        {/* Add Habit */}
        <form
          onSubmit={addHabit}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new habit..."
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold transition-all"
          >
            Add
          </button>
        </form>

        {/* Habit List */}
        <div className="space-y-4">
          {habits.map((h) => (
            <ItemCard key={h._id} item={h} onDone={handleDone} color="cyan" />
          ))}
        </div>
      </div>
    </section>
  );
}

