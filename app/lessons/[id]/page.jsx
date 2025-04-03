"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import lessonsData from "../data/lessons.json";

function LessonDetail({ params }) {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;

  const router = useRouter();
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [lessonVideo, setLessonVideo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const foundLesson = lessonsData.lessons.find(
        (l) => l.id === parseInt(id)
      );

      if (foundLesson) {
        // Extract video ID from the URL
        const url = foundLesson.videoId;
        const regex =
          /(?:\/embed\/|\/watch\?v=|\/(?:v|e(?:mbed)?)\/|youtu\.be\/|\/v\/|\/vi\/)([^?&/#]+)/;
        const match = url.match(regex);
        const videoId = match ? match[1] : null;
        setLessonVideo(videoId);

        setLesson(foundLesson);

        // Check local storage for completion status with error handling
        let savedLessons = [];
        try {
          const storedData = localStorage.getItem("germanLessons");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            savedLessons = Array.isArray(parsedData) ? parsedData : [];
          }
        } catch (error) {
          console.error("Error parsing lessons from localStorage:", error);
          savedLessons = [];
        }

        const savedLesson = savedLessons.find((l) => l.id === parseInt(id));
        if (savedLesson) {
          setCompleted(savedLesson.completed);
        } else {
          setCompleted(foundLesson.completed || false);
        }
      } else {
        router.push("/lessons");
      }
    }
  }, [id, router]);

  const toggleCompletion = () => {
    if (typeof window !== "undefined") {
      let savedLessons = [];
      try {
        const storedData = localStorage.getItem("germanLessons");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          savedLessons = Array.isArray(parsedData) ? parsedData : [];
        }
      } catch (error) {
        console.error("Error parsing lessons from localStorage:", error);
        savedLessons = [];
      }

      // Check if the lesson already exists in localStorage
      const lessonExists = savedLessons.some((l) => l.id === parseInt(id));

      let updatedLessons;
      if (lessonExists) {
        updatedLessons = savedLessons.map((l) =>
          l.id === parseInt(id) ? { ...l, completed: !completed } : l
        );
      } else {
        // If lesson doesn't exist in localStorage, add it
        updatedLessons = [
          ...savedLessons,
          { ...lesson, completed: !completed },
        ];
      }

      localStorage.setItem("germanLessons", JSON.stringify(updatedLessons));
      setCompleted(!completed);
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-pink-700">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
              <p className="text-pink-100 mt-1">German A1 Course</p>
            </div>
            <Link
              href="/lessons"
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all"
            >
              Back to Lessons
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Lesson Content */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-pink-100">
            <div
              className="prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            ></div>

            {/* Video Section */}
            {lessonVideo && (
              <div className="aspect-w-16 aspect-h-9 mb-6 rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${lessonVideo}`}
                  className="w-full h-96"
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Video Description Box */}
            <div className="bg-pink-50 rounded-xl p-5 mb-6 border border-pink-200">
              <h3 className="text-lg font-bold text-purple-800 mb-3">
                About This Lesson
              </h3>
              <p className="text-pink-700">{lesson.description}</p>
              <div className="mt-4 flex items-center text-sm text-pink-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Duration: ~25 minutes</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleCompletion}
                className={`px-6 py-3 rounded-lg shadow-md w-full sm:w-auto ${
                  completed
                    ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                    : "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                }`}
              >
                {completed ? "✓ Lesson Completed" : "Mark as Completed"}
              </motion.button>

              <div className="flex gap-3 w-full sm:w-auto">
                <Link
                  href={lesson.id > 1 ? `/lessons/${lesson.id - 1}` : "#"}
                  className={`flex items-center justify-center gap-2 px-4 py-3 bg-white border border-pink-200 rounded-xl hover:bg-pink-50 w-full ${
                    lesson.id <= 1 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Link>
                <Link
                  href={`/lessons/${lesson.id + 1}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-pink-200 rounded-xl hover:bg-pink-50 w-full"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default LessonDetail;
