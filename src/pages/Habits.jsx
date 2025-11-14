import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ItemCard from "../components/ItemCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import WeeklyTimeline from "../components/WeeklyTimeline";
// Fetch weekly data

export default function Habits() {
  
// Add to state
  const [weeklyHistory, setWeeklyHistory] = useState([]);
  const [currentWeekProgress, setCurrentWeekProgress] = useState(null);

  const fetchWeeklyData = async () => {
    const res = await fetch("/api/habits/weekly-stats", { credentials: "include" });
    const data = await res.json();
    setWeeklyHistory(data.history);
    setCurrentWeekProgress(data.currentWeek);
  };

  

  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [summary, setSummary] = useState({ total: 0, done: 0, percent: 0 });
// global scope variable
  const fetchHabits = async () => {
    const habitsRes = await fetch("/api/habits/show", { 
      credentials: "include" 
    });
    const habitsData = await habitsRes.json();
    setHabits(habitsData);
    
    const summaryRes = await fetch("/api/habits/summary", { 
      credentials: "include" 
    });
    const summaryData = await summaryRes.json();
    setSummary(summaryData);
  };
  // Data for ring chart
  const ringData = [
    { name: 'Completed', value: summary.done, color: 'url(#completedGradient )'},
    { name: 'Remaining', value: summary.total - summary.done, color: '#ef4444' }
  ];


  // function 
  const addHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    
    await fetch("/api/habits/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: newHabit }),
    });
    
    setNewHabit("");
    fetchHabits();
  };

  const handleDone = async (id) => {
    await fetch(`/api/habits/done/${id}`, { 
      method: "PUT", 
      credentials: "include" 
    });
    fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
    fetchWeeklyData();
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

       <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4 text-center">Today's Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <defs>
                  <linearGradient id="completedGradient" x1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#22d3ee" />
                   <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
                <Pie
                  data={ringData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {ringData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
             </ResponsiveContainer>
          </div>
          <div>
             SINI ADA BUG OI ## JANGAN LUPA
           <WeeklyTimeline 
            weeklyHistory={weeklyHistory}
            currentWeekProgress={currentWeekProgress}
          />
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

