import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [habitSummary, setHabitSummary] = useState([]);
  const [taskSummary, setTaskSummary] = useState([]);
  const [showForm, setShowForm] = useState(null); // 'habit' | 'task' | null
  const [inputValue, setInputValue] = useState("");
  const [descValue, setDescValue] = useState("");

  // Authenticate user
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  // Fetch all data
  useEffect(() => {
    if (!user) return;

    Promise.all([
      fetch("/api/habits/show", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/tasks/show", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/habits/summary", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/tasks/summary", { credentials: "include" }).then((r) => r.json()),
    ])
      .then(([habits, tasks, habitSummary, taskSummary]) => {
        setHabits(Array.isArray(habits) ? habits : []);
        setTasks(Array.isArray(tasks) ? tasks : []);
        setHabitSummary(habitSummary || {}); // ✅ summaries are objects
        setTaskSummary(taskSummary || {});   // ✅ summaries are objects     
      })
      .catch(console.error);
  }, [user]);

  const handleAdd = (type) => {
    if (!inputValue.trim()) return;

    fetch(`/api/${type}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: inputValue, description: descValue }),
    })
      .then(() => window.location.reload());
  };

  const handleDone = (type, id) => {
    fetch(`/api/${type}/done/${id}`, { method: "PUT", credentials: "include" })
      .then(() => window.location.reload());
  };

  if (!user)
    return <p className="text-center mt-20 text-white text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HEADER */}
    {/* LETAK NAVBAR DISINI / UNIVERSAL NAVBAR*/}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">
            Welcome back, {user.username}
          </h1>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* HABITS */}
          <Section
            title="Habits"
            color="from-blue-500 to-purple-500"
            items={habits}
            onAddClick={() => setShowForm("habit")}
            onDone={(id) => handleDone("habits", id)}
          />

          {/* TASKS */}
          <Section
            title="Tasks"
            color="from-purple-500 to-pink-500"
            items={tasks}
            onAddClick={() => setShowForm("task")}
            onDone={(id) => handleDone("tasks", id)}
          />

          {/* SUMMARY */}
          <SummaryCard
            habitSummary={habitSummary}
            taskSummary={taskSummary}
          />
        </div>

        {/* ADD FORM MODAL */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 z-50">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Add New {showForm === "habit" ? "Habit" : "Task"}
                </h2>
                <button
                  className="text-gray-300 hover:text-white"
                  onClick={() => setShowForm(null)}
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdd(showForm === "habit" ? "habits" : "tasks");
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Enter ${showForm === "habit" ? "habit" : "task"} name`}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="text"
                  value={descValue}
                  onChange={(e) => setDescValue(e.target.value)}
                  placeholder="Enter description (optional)"
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:from-green-400 hover:to-blue-400 transition"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, color, items, onAddClick, onDone }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl bg-white/10 backdrop-blur-lg p-5 border border-white/20 shadow-lg flex flex-col"
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={onAddClick}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 border border-white/20"
        >
          <PlusIcon className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 max-h-[400px] pr-1 scrollbar-thin scrollbar-thumb-white/20">
        {items.length ? (
          items.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.01 }}
              className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10"
            >
              <div className="flex flex-col">
                <span
                  className={`font-medium text-lg ${
                    item.completed ? "line-through text-gray-400" : "text-white"
                  }`}
                >
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-sm text-gray-300">{item.description}</span>
                )}
              </div>
              <button
                onClick={() => !item.completed && onDone(item._id)}
                disabled={item.completed}
                className={`px-3 py-1 rounded-lg text-sm font-bold text-white transition ${
                  item.completed
                    ? "bg-green-500/70 cursor-default"
                    : `bg-gradient-to-r ${color} hover:from-green-400 hover:to-blue-400`
                }`}
              >
                {item.completed ? (
                  <span className="inline-flex items-center gap-1">
                    <CheckCircleIcon className="w-5 h-5 text-white" /> Done
                  </span>
                ) : (
                  "Mark Done"
                )}
              </button>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-400 italic py-10">
            No {title.toLowerCase()} yet.
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SummaryCard({ habitSummary, taskSummary }) {
const data = [
  { name: "Habits", percent: habitSummary?.percent || 0 },
  { name: "Tasks", percent: taskSummary?.percent || 0 },
];
return (
  <ResponsiveContainer width="100%" height={250}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
    <XAxis dataKey="name" stroke="#ccc" />
    {/* 👇 Force a fixed 0–100 range */}
    <YAxis domain={[0, 100]} stroke="#ccc" tickFormatter={(v) => `${v}%`} />
    <Tooltip
      formatter={(value) => `${value}%`}
      contentStyle={{
        background: "#1e1e2e",
        borderRadius: "10px",
        border: "1px solid #444",
      }}
    />
    <Bar
      dataKey="percent"
      fill="url(#colorGradient)"
      radius={[10, 10, 0, 0]}
      animationDuration={900}
    />
    <defs>
      {/* 🎨 Add a nice gradient */}
      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </BarChart>
</ResponsiveContainer>

);
}

