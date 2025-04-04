"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import lessonsData from "./data/lessons.json"

function Lessons() {
  const [lessons, setLessons] = useState(lessonsData);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
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
    if (lessons.length > 0) {
      const completedLessons = lessons.lessons.filter(
        (lesson) => lesson.completed
      ).length;
      const newProgress = Math.round((completedLessons / lessons.lessons.length) * 100);
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
    if (lessons.lessons?.length === 0) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header with User Info */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold">
                HerLingua: German A1
              </h1>
              <p className="text-pink-100 mt-1">
                Begin your language journey today
              </p>
            </motion.div>

            {user && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4"
              >
              </motion.div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">

        {/* Course Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/lessons/${lesson.id}`} passHref>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                    lesson.completed ? "border-green-400" : "border-pink-400"
                  } cursor-pointer`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-purple-800 mb-2">
                        {lesson.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lesson.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        {lesson.completed ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <p className="text-pink-700 text-sm mb-4">
                      {lesson.description}
                    </p>
                    <div className="text-pink-600 text-sm font-medium flex items-center">
                      <span>View Lesson</span>
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Lessons;