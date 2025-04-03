"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import lessonsData from "./data/lessons.json";
// Main Lessons List Component
function Lessons() {
  // Initialize lessons from localStorage or default to empty lessons
  const [lessons, setLessons] = useState(
    lessonsData
    // () => {
    // if (typeof window !== "undefined") {
    //   const savedLessons = localStorage.getItem("germanLessons");
    //   return savedLessons ? JSON.parse(savedLessons) : [];
    // }
    // return [];
    // }
  );

  // State for tracking overall progress
  const [progress, setProgress] = useState(0);
  console.log("lessons data:", lessonsData.lessons);
  // Effect to calculate progress whenever lessons change
  useEffect(() => {
    if (lessons.length > 0) {
      const completedLessons = lessons.filter(
        (lesson) => lesson.completed
      ).length;
      const newProgress = Math.round((completedLessons / lessons.length) * 100);
      setProgress(newProgress);
    }
  }, [lessons]);

  // Effect to save lessons to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("germanLessons", JSON.stringify(lessons));
    }
  }, [lessons]);

  // Effect to initialize default lessons if none exist
  useEffect(() => {
    if (lessons.length === 0) {
      //       const defaultLessons = [
      //         {
      //           id: 1,
      //           title: "Greetings and Introductions",
      //           description: `Our German Language journey will start with the basic greetings in the German language. In this video we will learn different ways to greet people in various parts of Germany.
      // Along with the Greetings, you will also see the English translation of each new word that you will learn, don't forget to note them down and learn them by heart because this will help you in expanding your vocabulary with each new lesson.
      // You may be wondering, why we are beginning the A1 Level with basic greetings. It's because, before we get into the grammar and other details, it’s important to get a hang of the language. That will result into having a better understanding of the language. `,
      //           videoId: "l4506PyhRiGnUgWn",
      //           completed: false,
      //           content: `<p>German greetings vary depending on the time of day and formality. Here are the essentials:</p>
      //                     <ul class="list-disc pl-5 my-3">
      //                       <li><strong>Guten Morgen</strong> - Good morning (until about 10am)</li>
      //                       <li><strong>Guten Tag</strong> - Good day (10am to dusk)</li>
      //                       <li><strong>Guten Abend</strong> - Good evening</li>
      //                       <li><strong>Hallo</strong> - Hello (informal)</li>
      //                     </ul>`,
      //         },
      //         {
      //           id: 2,
      //           title: "Common Phrases ",
      //           description: `Learn German Lesson 2 -  Common phrases | Häufige Redemittel
      // In Lesson 2 you will learn some common phrases that you will come across in your daily life in Germany. Knowing these phrases makes the conversations much more politer, structured and relatable.
      // Some of the phrases you will be learning in this video are:
      // --   “Vielen Dank” (Thank you very much)
      // --   "Wie bitte?” (I beg your pardon)
      // --   “Sprechen Sie Deutsch?” (Do you speak German?)
      // At the end of the video you will find a quick overview of all the phrases that you learned.
      // `,
      //           videoId: "4zCN9oXhpb_gr-Zr",
      //           completed: false,
      //           content: `<p>German numbers are straightforward but have some unique pronunciations:</p>
      //                     <div class="grid grid-cols-2 gap-2 my-3">
      //                       <div class="bg-pink-50 p-3 rounded-lg">
      //                         <p class="font-bold">1-10:</p>
      //                         <p>eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn</p>
      //                       </div>
      //                       <div class="bg-pink-50 p-3 rounded-lg">
      //                         <p class="font-bold">11-20:</p>
      //                         <p>elf, zwölf, dreizehn, vierzehn, fünfzehn, sechzehn, siebzehn, achtzehn, neunzehn, zwanzig</p>
      //                       </div>
      //                     </div>`,
      //         },
      //       ];
      setLessons(lessonsData);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Progress Dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white p-6 rounded-2xl shadow-lg border border-pink-100"
        >
          <h2 className="text-xl font-bold text-purple-800 mb-4">
            Your Learning Progress
          </h2>
          <div className="w-full bg-pink-100 rounded-full h-3 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full"
            ></motion.div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-pink-700 font-medium">
              {progress}% Complete
            </span>
            <span className="text-purple-700">
              {lessons?.lessons?.filter((lesson) => lesson.completed).length}/
              {lessons.length} Lessons
            </span>
          </div>
        </motion.div>

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
