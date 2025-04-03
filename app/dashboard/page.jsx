"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import lessonsData from "../lessons/data/lessons.json";

function Dashboard() {
  const [lessons, setLessons] = useState(lessonsData);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Calculate progress
  useEffect(() => {
    if (lessons.lessons?.length > 0) {
      const completed = lessons.lessons.filter(
        (lesson) => lesson.completed
      ).length;
      setCompletedCount(completed);
      const newProgress = Math.round((completed / lessons.lessons.length) * 100);
      setProgress(newProgress);
    }
  }, [lessons]);

  // Save lessons to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("germanLessons", JSON.stringify(lessons));
    }
  }, [lessons]);

  // Initialize default lessons if none exist
  useEffect(() => {
    if (!lessons.lessons?.length) {
      setLessons(lessonsData);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Group lessons by categories (assuming we can derive categories from lessons)
  const categories = lessons.lessons?.reduce((acc, lesson) => {
    const category = lesson.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(lesson);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex h-screen">
        <div className="w-64 bg-purple-900 text-white hidden md:block">
          <div className="p-5">
            <h1 className="text-xl font-bold mb-6">HerLingua</h1>
            
            <nav className="mt-8">
              <div className="mb-4">
                <p className="text-purple-300 text-xs uppercase tracking-wider mb-2">Main</p>
                <a href="#" className="flex items-center py-2 px-4 bg-purple-800 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
                  </svg>
                  Dashboard
                </a>
              </div>
              
              <div className="mb-4">
                <p className="text-purple-300 text-xs uppercase tracking-wider mb-2">Learning</p>
                <ul>
                  <li>
                    <Link href="/lessons" className="flex items-center py-2 px-4 hover:bg-purple-800 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Lessons
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="text-purple-300 text-xs uppercase tracking-wider mb-2">Account</p>
                <ul>
                  <li>
                    <a href="#" className="flex items-center py-2 px-4 hover:bg-purple-800 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center py-2 px-4 hover:bg-purple-800 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center py-2 px-4 hover:bg-purple-800 rounded-lg text-left"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Top Navigation */}
          <header className="bg-white shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center gap-4 md:hidden">
                <button className="text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-lg font-bold text-purple-900">HerLingua</h1>
              </div>
              
              <div className="hidden md:block">
                <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
              </div>
              
              {user && (
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="font-medium text-gray-800">{user.displayName || user.email}</p>
                    <p className="text-sm text-gray-500">German A1 Level</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-medium">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <button className="md:hidden" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-5">Your Progress Overview</h3>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Overall Progress</p>
                      <h4 className="text-2xl font-bold text-gray-800">{progress}%</h4>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                      className="bg-purple-500 h-2 rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-pink-500"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Completed Lessons</p>
                      <h4 className="text-2xl font-bold text-gray-800">{completedCount}/{lessons.lessons?.length || 0}</h4>
                    </div>
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    {completedCount === 0 
                      ? "Start your first lesson today!" 
                      : completedCount === lessons.lessons?.length 
                        ? "Congratulations! All lessons completed." 
                        : `${lessons.lessons?.length - completedCount} lessons remaining`}
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Current Level</p>
                      <h4 className="text-2xl font-bold text-gray-800">A1</h4>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Beginner - Learning basics
                  </p>
                </motion.div>
              </div>
              
              {/* Recent Activity */}
              {/* <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-700">Recent Activity</h3>
                  <button className="text-purple-600 text-sm font-medium hover:text-purple-800">View All</button>
                </div>
                
                <div className="space-y-4">
                  {lessons.lessons?.slice(0, 3).map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        lesson.completed ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"
                      }`}>
                        {lesson.completed ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-800">{lesson.title}</h4>
                        <p className="text-xs text-gray-500">{lesson.completed ? "Completed" : "In progress"}</p>
                      </div>
                      <div className="ml-auto">
                        <Link href={`/lessons/${lesson.id}`} passHref>
                          <button className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            lesson.completed 
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                          }`}>
                            {lesson.completed ? "Review" : "Continue"}
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </motion.div>
            
            {/* Lesson Categories */}
            <div>
              {/* <h3 className="text-lg font-medium text-gray-700 mb-5">Lessons by Category</h3> */}
              
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {Object.entries(categories || {}).map(([category, categoryLessons], index) => (
                  <motion.div 
                    key={category}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-4 px-6">
                      <h4 className="text-white font-medium">{category}</h4>
                    </div>
                    <div className="p-4">
                      <ul className="divide-y divide-gray-100">
                        {categoryLessons.slice(0, 3).map((lesson) => (
                          <li key={lesson.id} className="py-3">
                            <Link href={`/lessons/${lesson.id}`} passHref>
                              <div className="flex items-center cursor-pointer">
                                <span className={`w-2 h-2 rounded-full ${lesson.completed ? "bg-green-500" : "bg-purple-500"}`}></span>
                                <span className="ml-3 text-gray-700 hover:text-purple-700">{lesson.title}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      
                      {categoryLessons.length > 3 && (
                        <div className="mt-2 text-center">
                          <Link href={"/lessons"} className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                            View all  lessons
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div> */}
              
              {/* Continue Learning Card */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Ready to continue your journey?</h3>
                    <p className="text-purple-100 mb-4">Pick up where you left off or start a new lesson.</p>
                    <Link href={"/lessons"} className="bg-white text-purple-700 font-medium px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
                      Continue Learning
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-purple-300 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;