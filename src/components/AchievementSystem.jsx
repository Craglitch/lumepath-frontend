// components/AchievementBadge.jsx
import React, { useEffect, useState } from 'react';

const AchievementBadge = () => {
  const [achievements, setAchievements] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Achievement definitions
  const achievementDefinitions = [
    { 
      id: 1, 
      title: "First Steps", 
      description: "Complete 7-day streak", 
      streakRequired: 7, 
      type: "streak",
      icon: "🦶"
    },
    { 
      id: 2, 
      title: "Consistency King", 
      description: "Complete 30-day streak", 
      streakRequired: 30, 
      type: "streak",
      icon: "👑"
    },
    { 
      id: 3, 
      title: "Habit Master", 
      description: "Complete 90-day streak", 
      streakRequired: 90, 
      type: "streak",
      icon: "⚡"
    },
    { 
      id: 4, 
      title: "Legendary", 
      description: "Complete 365-day streak", 
      streakRequired: 365, 
      type: "streak",
      icon: "🏆"
    },
    { 
      id: 5, 
      title: "Week Warrior", 
      description: "Perfect week completion", 
      streakRequired: 7, 
      type: "weekly",
      icon: "🛡️"
    },
    { 
      id: 6, 
      title: "Month Master", 
      description: "Perfect month completion", 
      streakRequired: 30, 
      type: "monthly",
      icon: "🌟"
    }
  ];

  // Fetch habits from API
  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/habits/show', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        credentials: "include"
      });
      
      if (!response.ok) throw new Error('Failed to fetch habits');
      
      const habitsData = await response.json();
      setHabits(Array.isArray(habitsData) ? habitsData : []);
      calculateAchievements(habitsData);
    } catch (error) {
      console.error('Error fetching habits:', error);
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate which achievements are unlocked
  const calculateAchievements = (habitsData) => {
    if (!Array.isArray(habitsData)) {
      setAchievements(achievementDefinitions.map(achievement => ({
        ...achievement,
        unlocked: false,
        currentStreak: 0
      })));
      return;
    }

    const unlockedAchievements = achievementDefinitions.map(achievement => {
      let unlocked = false;
      let currentStreak = 0;

      // For streak-based achievements
      if (achievement.type === "streak") {
        const maxStreak = Math.max(...habitsData.map(habit => habit.streak || 0), 0);
        currentStreak = maxStreak;
        unlocked = maxStreak >= achievement.streakRequired;
      }
      
      // For weekly perfect achievements
      if (achievement.type === "weekly") {
        const hasPerfectWeek = habitsData.some(habit =>
          habit.weeklyHistory?.some(week => week.perfectWeek)
        );
        unlocked = hasPerfectWeek;
        currentStreak = habitsData.reduce((count, habit) => 
          count + (habit.weeklyHistory?.filter(week => week.perfectWeek).length || 0), 0
        );
      }

      // For monthly achievements
      if (achievement.type === "monthly") {
        const maxStreak = Math.max(...habitsData.map(habit => habit.streak || 0), 0);
        currentStreak = maxStreak;
        unlocked = maxStreak >= achievement.streakRequired;
      }
      
      return {
        ...achievement,
        unlocked,
        currentStreak
      };
    });
    
    setAchievements(unlockedAchievements);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold mb-4 text-white">Achievement Badges</h2>
        <div className="text-center text-gray-400 py-8">Loading achievements...</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-6 border border-white/20">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Achievement Badges</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <AchievementCard 
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
};

const AchievementCard = ({ achievement }) => {
  const { title, description, streakRequired, unlocked, icon, currentStreak } = achievement;
  
  return (
    <div className={`
      relative p-4 rounded-xl border-2 transition-all duration-300 min-h-[140px] flex flex-col
      ${unlocked 
        ? 'bg-gradient-to-br from-purple-600/80 to-pink-600/80 border-purple-300 shadow-lg shadow-purple-500/30' 
        : 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-600 opacity-80'
      }
    `}>
      
      {/* Glow effect for unlocked achievements */}
      {unlocked && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/10 animate-pulse"></div>
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Badge Header */}
        <div className="flex items-center justify-between mb-2">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center text-lg
            ${unlocked 
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md' 
              : 'bg-gray-600'
            }
          `}>
            {icon}
          </div>
          
          {/* Status Badge */}
          <span className={`
            text-xs font-bold px-2 py-1 rounded-full
            ${unlocked 
              ? 'bg-green-500/80 text-white' 
              : 'bg-gray-600 text-gray-300'
            }
          `}>
            {unlocked ? 'UNLOCKED' : 'LOCKED'}
          </span>
        </div>
        
        {/* Achievement Content */}
        <div className="flex-1">
          <h3 className={`
            font-bold text-sm mb-1
            ${unlocked ? 'text-white' : 'text-gray-400'}
          `}>
            {title}
          </h3>
          
          <p className={`
            text-xs mb-2
            ${unlocked ? 'text-purple-100' : 'text-gray-500'}
          `}>
            {description}
          </p>
          
          {/* Progress */}
          <div className={`
            text-xs font-semibold
            ${unlocked ? 'text-yellow-300' : 'text-gray-400'}
          `}>
            {streakRequired} days
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;
