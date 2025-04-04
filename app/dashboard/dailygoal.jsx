"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function DailyGoalSection({ completedCount }) {
  const dailyProgress = Math.min(completedCount % 3, 3);
  const isGoalComplete = dailyProgress === 3;

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">Daily Goal</h3>
        {isGoalComplete && (
          <span className="flex items-center text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
            <Zap className="h-4 w-4 mr-1" />
            Completed
          </span>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center text-center">
        {/* Circular Progress */}
        <div className="w-36 h-36 relative mb-4">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <circle 
              cx="18" 
              cy="18" 
              r="16" 
              fill="none" 
              stroke="#E5E7EB" 
              strokeWidth="3"
            />
            <circle 
              cx="18" 
              cy="18" 
              r="16" 
              fill="none" 
              stroke="#8B5CF6" 
              strokeWidth="3" 
              strokeDasharray={`${(dailyProgress / 3) * 100}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {dailyProgress}/3
              </p>
              <p className="text-sm text-gray-500">lessons today</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          {isGoalComplete 
            ? "Great job! You've completed today's goal!"
            : "Complete 3 lessons daily to maintain your streak"}
        </p>
        
        <Link
          href="/lessons"
          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
            isGoalComplete
              ? 'bg-gray-100 text-gray-600'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {isGoalComplete ? 'Goal Completed!' : 'Continue Learning'}
        </Link>
      </div>
    </motion.div>
  );
}