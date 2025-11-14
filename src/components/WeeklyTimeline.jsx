import React from "react";
import { motion } from "framer-motion";
// redeploy trigger
export default function WeeklyTimeline({ weeklyHistory, currentWeekProgress }) {
  // Combine historical data with current week
  const allWeeks = [...weeklyHistory, { ...currentWeekProgress, isCurrent: true }];

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-bold mb-4 text-center">Weekly Streak Timeline</h3>
      
      <div className="space-y-3">
        {allWeeks.map((week, index) => (
          <WeekProgressBar 
            key={week.week || 'current'} 
            week={week} 
            isLast={index === allWeeks.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function WeekProgressBar({ week, isLast }) {
  const percentage = week.percentage || 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-3 rounded-lg border ${
        week.isCurrent 
          ? 'border-cyan-500 bg-cyan-500/10' 
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">
          {week.isCurrent ? 'Current Week' : `Week ${week.weekNumber}`}
          {week.perfectWeek && " ⭐"}
        </span>
        <span className="text-sm text-gray-300">
          {week.completedDays}/{week.totalDays} days ({percentage}%)
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-2 rounded-full ${
            week.perfectWeek 
              ? 'bg-green-500' 
              : week.isCurrent 
                ? 'bg-cyan-500' 
                : 'bg-blue-500'
          }`}
        />
      </div>
      
      {isLast && week.isCurrent && (
        <p className="text-xs text-cyan-400 mt-2">
          🎯 Still in progress - complete more habits this week!
        </p>
      )}
    </motion.div>
  );
}
