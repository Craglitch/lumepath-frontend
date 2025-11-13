import React, { useEffect, useState } from "react";

export default function Sum() {
  const [habitSummary, setHabitSummary] = useState(null);
  const [taskSummary, setTaskSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/habits/summary", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/tasks/summary", { credentials: "include" }).then((r) => r.json()),
    ])
      .then(([h, t]) => {
        setHabitSummary(h);
        setTaskSummary(t);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-center text-white mt-20 animate-pulse">
        Loading analytics...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 drop-shadow">
        Progress Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Habit Section */}
        <Card
          title="Habit Overview"
          data={habitSummary}
          gradient="from-blue-500 to-purple-600"
        />

        {/* Task Section */}
        <Card
          title="Task Overview"
          data={taskSummary}
          gradient="from-pink-500 to-purple-600"
        />
      </div>

      <div className="mt-10 w-full max-w-4xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
        <h2 className="text-xl font-bold text-blue-200 mb-2">Insight</h2>
        <p className="text-gray-200">
          Consistency builds mastery. Your habits shape your future—track your
          streaks daily and aim for full progress rings.
        </p>
      </div>
    </div>
  );
}

/* Subcomponent for displaying analytics card */
function Card({ title, data, gradient }) {
  const percent = data?.percent || 0;
  const total = data?.total || 0;
  const completed = data?.completed || data?.done || 0;

  return (
    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl overflow-hidden flex flex-col items-center">
      <div
        className={`absolute inset-0 opacity-10 bg-gradient-to-br ${gradient} blur-2xl`}
      ></div>
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

      <ProgressRing percent={percent} gradient={gradient} />

      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-200">
          {completed} / {total} Completed
        </p>
        <p className="text-sm text-gray-400">
          {percent >= 100
            ? "Perfect completion! Keep momentum strong."
            : percent >= 75
            ? "Excellent! You’re close to full consistency."
            : percent >= 50
            ? "Solid progress. Keep building discipline."
            : percent > 0
            ? "You’ve started—keep pushing forward."
            : "No completions yet. Begin today!"}
        </p>
      </div>
    </div>
  );
}

/* Progress Ring Visualization */
function ProgressRing({ percent, gradient }) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="mx-auto drop-shadow-lg"
    >
      <circle
        stroke="rgba(255,255,255,0.2)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <defs>
        <linearGradient id={`grad-${gradient}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={gradient.split(" ")[0].replace("from-", "")} />
          <stop offset="100%" stopColor={gradient.split(" ")[1].replace("to-", "")} />
        </linearGradient>
      </defs>
      <circle
        stroke={`url(#grad-${gradient})`}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{
          strokeDashoffset,
          transition: "stroke-dashoffset 0.8s cubic-bezier(.4,2,.3,1)",
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x={radius}
        y={radius + 8}
        textAnchor="middle"
        fill="white"
        fontSize="22"
        fontWeight="bold"
      >
        {percent}%
      </text>
    </svg>
  );
}


