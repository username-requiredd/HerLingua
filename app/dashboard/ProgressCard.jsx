import { motion } from "framer-motion";
import { Book, LayoutDashboard, Zap, BarChart } from "lucide-react";

const iconComponents = {
  chart: BarChart,
  book: Book,
  streak: Zap,
  dashboard: LayoutDashboard
};

export default function ProgressCard({
  title,
  value,
  icon,
  progress,
  color,
  description,
  delay
}) {
  const IconComponent = iconComponents[icon];
  const colorClasses = {
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-500",
      progress: "bg-purple-500"
    },
    pink: {
      bg: "bg-pink-100",
      text: "text-pink-600",
      border: "border-pink-500",
      progress: "bg-pink-500"
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      border: "border-green-500",
      progress: "bg-green-500"
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${colorClasses[color].border} hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
        </div>
        <div className={`p-2 ${colorClasses[color].bg} rounded-lg`}>
          <IconComponent className={`h-6 w-6 ${colorClasses[color].text}`} />
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-500 mt-4">
          {description}
        </p>
      )}
      {progress !== undefined && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className={`${colorClasses[color].progress} h-2 rounded-full`}
          ></motion.div>
        </div>
      )}
    </motion.div>
  );
}