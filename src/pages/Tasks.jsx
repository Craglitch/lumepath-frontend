import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ItemCard from "../components/ItemCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [summary, setSummary] = useState({ total: 0, done: 0, percent: 0 });

  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks/show"); // missmatched baiki /api/task to /api/tasks (refer mmapi)
    setTasks(res.data);
    const sum = await axios.get("/api/tasks/summary"); // missmatched fixed (mmapi)
    setSummary(sum.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    await axios.post("/api/tasks/add", { title: newTask }); // missmatched fixed (mmapi)
    setNewTask("");
    fetchTasks();
  };

  const handleDone = async (id) => {
    await axios.put(`/api/tasks/done/${id}`); // missmatched fixed (mmapi)
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section className="min-h-screen px-6 py-24 bg-[#0b0b1a] text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Task Manager
          </h1>
          <p className="text-gray-400">Organize and conquer your daily goals.</p>
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

        {/* Add Task */}
        <form
          onSubmit={addTask}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold transition-all"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map((t) => (
            <ItemCard key={t._id} item={t} onDone={handleDone} color="indigo" />
          ))}
        </div>
      </div>
    </section>
  );
}

