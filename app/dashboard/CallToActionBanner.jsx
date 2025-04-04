import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToActionBanner({
  progress,
  completedCount,
  totalLessons,
  getPersonalizedMessage
}) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold mb-2">{getPersonalizedMessage()}</h3>
          <p className="text-purple-100 mb-4">
            {progress === 0 ? "Start with your first lesson today" :
            `You've completed ${completedCount} of ${totalLessons} lessons (${progress}%)`}
          </p>
          <Link href="/lessons" className="bg-white text-purple-700 font-medium px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
            {progress === 0 ? "Start Learning" : "Continue Learning"}
          </Link>
        </div>
        <div className="hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-purple-300 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}