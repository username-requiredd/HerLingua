import { motion } from "framer-motion";
import ProgressCard from "./ProgressCard";
import CallToActionBanner from "./CallToActionBanner";
import MilestonesSection from "./milestones";
import RecentActivitySection from "./recentactivity";
import DailyGoalSection from "./dailygoal";
export default function DashboardContent({
  user,
  progress,
  completedCount,
  totalLessons,
  streakDays,
  daysSinceActive,
  getTimeOfDayGreeting,
  getPersonalizedMessage
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* User Greeting */}
      {user && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {getTimeOfDayGreeting()}, {user.displayName?.split(' ')[0] || 'Student'}!
          </h3>
          <p className="text-gray-600">
            {daysSinceActive === 0 
              ? "Good to see you continuing your studies today." 
              : daysSinceActive === 1 
                ? "Welcome back after a day off!" 
                : `Welcome back! It's been ${daysSinceActive} days since your last lesson.`}
          </p>
        </div>
      )}

      {/* Progress Overview */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-5">Your Progress Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ProgressCard 
            title="Overall Progress"
            value={`${progress}%`}
            icon="chart"
            progress={progress}
            color="purple"
            delay={0.1}
          />
          
          <ProgressCard 
            title="Completed Lessons"
            value={`${completedCount}/${totalLessons}`}
            icon="book"
            description={
              completedCount === 0 
                ? "Start your first lesson today!" 
                : completedCount === totalLessons 
                  ? "Congratulations! All lessons completed." 
                  : `${totalLessons - completedCount} lessons remaining`
            }
            color="pink"
            delay={0.2}
          />
          
          <ProgressCard 
            title="Current Streak"
            value={`${streakDays} days`}
            icon="streak"
            description={
              streakDays === 0 ? "Start your streak today!" :
              streakDays < 3 ? "Keep it going!" :
              streakDays < 7 ? "You're on fire!" :
              "Amazing consistency!"
            }
            color="green"
            delay={0.3}
          />
        </div>

        <CallToActionBanner 
          progress={progress}
          completedCount={completedCount}
          totalLessons={totalLessons}
          getPersonalizedMessage={getPersonalizedMessage}
        />
      </div>

      <RecentActivitySection completedCount={completedCount} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MilestonesSection 
          completedCount={completedCount}
          streakDays={streakDays}
        />
        
        <DailyGoalSection completedCount={completedCount} />
      </div>
    </motion.div>
  );
}