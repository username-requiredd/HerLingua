"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { listenToUserProgress } from "@/services/userprogress";
import Head from "next/head";

function Dashboard() {
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        const unsubscribeProgress = listenToUserProgress(currentUser.uid, (progressData) => {
          setLoading(false);
          if (progressData) {
            const completed = progressData.completedLessons?.length || 0;
            const total = progressData.totalLessons || 30;
            
            setCompletedCount(completed);
            setTotalLessons(total);
            setProgress(Math.round((completed / total) * 100));
          } else {
            setCompletedCount(0);
            setTotalLessons(30);
            setProgress(0);
          }
        }, (err) => {
          setLoading(false);
          setError("Failed to load progress data. Please try again later.");
          console.error("Error fetching progress:", err);
        });
        
        return () => unsubscribeProgress();
      } else {
        setUser(null);
        setLoading(false);
        router.push("/");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogoutSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setError("Failed to sign out. Please try again.");
      console.error("Error signing out:", error);
    }
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const streakDays = 5; 
  const lastActiveDate = new Date(); 
  const today = new Date();
  const daysSinceActive = Math.floor((today - lastActiveDate) / (1000 * 60 * 60 * 24));
  
  const getPersonalizedMessage = () => {
    if (progress === 0) return "Ready to start your journey?";
    if (daysSinceActive > 2) return "Welcome back! Ready to continue?";
    if (progress < 30) return "You're making steady progress!";
    if (progress < 70) return "Keep up the amazing work!";
    return "You're almost there!";
  };

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const SidebarContent = () => (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-6">HerLingua</h1>
      <nav className="mt-8">
        <div className="mb-4">
          <p className="text-purple-300 text-xs uppercase tracking-wider mb-2">Main</p>
          <a href="#" className="flex items-center py-2 px-4 bg-purple-800 rounded-lg" aria-current="page">
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
              <Link href="/lessons" className="flex items-center py-2 px-4 hover:bg-purple-800 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Lessons
              </Link>
            </li>
            <li>
              <Link href="/practice" className="flex items-center py-2 px-4 hover:bg-purple-800 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Practice
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <p className="text-purple-300 text-xs uppercase tracking-wider mb-2">Account</p>
          <ul>
            <li>
              <Link href="/profile" className="flex items-center py-2 px-4 hover:bg-purple-800 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center py-2 px-4 hover:bg-purple-800 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center py-2 px-4 hover:bg-purple-800 rounded-lg text-left transition-colors"
                aria-label="Logout from HerLingua"
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
  );

  if (logoutSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-lg shadow-md text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Successfully logged out</h2>
          <p className="text-gray-600 mb-4">Redirecting you to the homepage...</p>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5 }}
              className="bg-green-500 h-1 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - HerLingua</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-purple-900 text-white transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
          aria-hidden={!mobileSidebarOpen}
        >
          <SidebarContent />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block fixed inset-y-0 left-0 z-40 w-64 bg-purple-900 text-white">
          <SidebarContent />
        </div>

        {/* Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
            onClick={toggleMobileSidebar}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <div className={`md:ml-64 transition-all duration-300 ${mobileSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <header className="bg-white shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center gap-4 md:hidden">
                <button 
                  className="text-gray-600"
                  onClick={toggleMobileSidebar}
                  aria-label={mobileSidebarOpen ? "Close menu" : "Open menu"}
                >
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
                  <button 
                    className="md:hidden" 
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </header>

          <main className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading your dashboard...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>{error}</p>
                </div>
                <button 
                  className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
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

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-5">Your Progress Overview</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500 hover:shadow-md transition-shadow"
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
                      <div className="mt-4 w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
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
                      className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-pink-500 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Completed Lessons</p>
                          <h4 className="text-2xl font-bold text-gray-800">{completedCount}/{totalLessons}</h4>
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
                          : completedCount === totalLessons 
                            ? "Congratulations! All lessons completed." 
                            : `${totalLessons - completedCount} lessons remaining`}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Current Streak</p>
                          <h4 className="text-2xl font-bold text-gray-800">{streakDays} days</h4>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        {streakDays === 0 ? "Start your streak today!" :
                         streakDays < 3 ? "Keep it going!" :
                         streakDays < 7 ? "You're on fire!" :
                         "Amazing consistency!"}
                      </p>
                    </motion.div>
                  </div>

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
                </div>

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
                        
                        <Link href="/activity" className="block text-center text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors">
                          View all activity
                        </Link>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl shadow-sm p-6"
                  >
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Upcoming Milestones</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-blue-100 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Complete 10 lessons</p>
                            <div className="mt-1 text-xs text-gray-500">
                              {completedCount >= 10 ? 'Completed!' : `${completedCount}/10 lessons`}
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
                              stroke="#8B5CF6"
                              strokeWidth="3"
                              strokeDasharray={`${Math.min(completedCount / 10 * 100, 100)}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                            {Math.min(Math.round(completedCount / 10 * 100), 100)}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-pink-100 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">7-day study streak</p>
                            <div className="mt-1 text-xs text-gray-500">
                              {streakDays >= 7 ? 'Completed!' : `${streakDays}/7 days`}
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
                              stroke="#EC4899"
                              strokeWidth="3"
                              strokeDasharray={`${Math.min(streakDays / 7 * 100, 100)}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                            {Math.min(Math.round(streakDays / 7 * 100), 100)}%
                          </div>
                        </div>
                      </div>
                      
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
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-xl shadow-sm p-6"
                  >
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Daily Goal</h3>
                    
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-36 h-36 relative mb-4">
                        <svg viewBox="0 0 36 36" className="w-full h-full">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                          <circle 
                            cx="18" 
                            cy="18" 
                            r="16" 
                            fill="none" 
                            stroke="#8B5CF6" 
                            strokeWidth="3" 
                            strokeDasharray={`${Math.min(completedCount % 3, 3) * 33.33}, 100`} 
                            strokeDashoffset="25" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div>
                            <p className="text-3xl font-bold text-gray-800">{Math.min(completedCount % 3, 3)}/3</p>
                            <p className="text-sm text-gray-500">lessons today</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">
                        Complete 3 lessons daily to maintain your streak and fast-track your learning!
                      </p>
                      
                      <Link 
                        href="/lessons" 
                        className={`px-4 py-2 rounded-lg font-medium ${
                          completedCount % 3 === 0 && completedCount > 0 
                            ? 'bg-gray-100 text-gray-600' 
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        } transition-colors`}
                      >
                        {completedCount % 3 === 0 && completedCount > 0 
                          ? 'Daily Goal Completed!'
                          : 'Continue Learning'}
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;