import Link from "next/link";

export default function RecentActivitySection({ completedCount }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-700 mb-5">Recent Activity</h3>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        {completedCount > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Completed Lesson {completedCount}</h4>
                <p className="text-sm text-gray-500">Basic Conversation</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">Today</div>
            </div>
            
            {completedCount > 1 && (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Completed Lesson {completedCount - 1}</h4>
                  <p className="text-sm text-gray-500">Vocabulary Building</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">Yesterday</div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="text-gray-500">No activity yet. Start your first lesson!</p>
            <Link href="/lessons" className="inline-block mt-4 text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors">
              Start learning
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}