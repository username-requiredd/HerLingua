import { motion } from "framer-motion";

export default function MilestonesSection({
  completedCount,
  streakDays
}) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h3 className="text-lg font-medium text-gray-700 mb-4">Upcoming Milestones</h3>
      
      <div className="space-y-4">
        <MilestoneItem 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          }
          title="Complete 10 lessons"
          status={completedCount >= 10 ? 'Completed!' : `${completedCount}/10 lessons`}
          progress={Math.min(completedCount / 10 * 100, 100)}
          color="purple"
        />
        
        <MilestoneItem 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="7-day study streak"
          status={streakDays >= 7 ? 'Completed!' : `${streakDays}/7 days`}
          progress={Math.min(streakDays / 7 * 100, 100)}
          color="pink"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-1.5 bg-amber-100 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">Complete first assessment</p>
              <div className="mt-1 text-xs text-gray-500">
                Unlocks at 15 lessons
              </div>
            </div>
          </div>
          <button 
            className={`px-3 py-1 rounded-lg text-xs font-medium ${
              completedCount >= 15 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={completedCount < 15}
          >
            {completedCount >= 15 ? 'Start' : 'Locked'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MilestoneItem({ icon, title, status, progress, color }) {
  const colorClasses = {
    purple: "stroke-purple-600",
    pink: "stroke-pink-600",
    green: "stroke-green-600"
  };

  return (
    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
      <div className="flex items-center">
        <div className="p-1.5 bg-blue-100 rounded-lg mr-3">
          {icon}
        </div>
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <div className="mt-1 text-xs text-gray-500">
            {status}
          </div>
        </div>
      </div>
      <div className="w-16 h-16 relative">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
            strokeDasharray="100, 100"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color === 'purple' ? '#8B5CF6' : color === 'pink' ? '#EC4899' : '#10B981'}
            strokeWidth="3"
            strokeDasharray={`${progress}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
          {Math.min(Math.round(progress), 100)}%
        </div>
      </div>
    </div>
  );
}