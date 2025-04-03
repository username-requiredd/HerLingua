"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Dashboard() {
  const [user] = useState({
    name: "Anna Schmidt",
    email: "anna@example.com",
  });

  const [progress, setProgress] = useState({
    totalLessons: 20,
    completedLessons: 8,
    currentLesson: 9,
  });

  const modules = [
    {
      id: 1,
      title: "Introduction to German",
      lessons: [
        { id: 1, title: "Greetings and Introductions", completed: true },
        { id: 2, title: "Numbers 1-20", completed: true },
        { id: 3, title: "Basic Questions", completed: true },
      ],
    },
    {
      id: 2,
      title: "Daily Conversations",
      lessons: [
        { id: 4, title: "Ordering Food", completed: true },
        { id: 5, title: "Shopping Vocabulary", completed: true },
        { id: 6, title: "Asking for Directions", completed: false },
      ],
    },
    {
      id: 3,
      title: "Grammar Basics",
      lessons: [
        { id: 7, title: "Pronouns", completed: true },
        { id: 8, title: "Present Tense Verbs", completed: true },
        { id: 9, title: "Articles (der, die, das)", completed: false },
        { id: 10, title: "Basic Sentence Structure", completed: false },
      ],
    },
  ];

  const toggleLessonCompletion = (moduleId, lessonId) => {
    setProgress((prevProgress) => {
      const updatedModules = modules.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map((lesson) => {
            if (lesson.id === lessonId) {
              const newCompletedState = !lesson.completed;

              const completedLessonsDelta = newCompletedState ? 1 : -1;

              return { ...lesson, completed: newCompletedState };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });

      const completedCount = modules.flat().reduce((count, module) => {
        return (
          count + module.lessons.filter((lesson) => lesson.completed).length
        );
      }, 0);

      return {
        ...prevProgress,
        completedLessons: completedCount,
      };
    });
  };

  const progressPercentage = Math.round(
    (progress.completedLessons / progress.totalLessons) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Dashboard - Learn German</title>
      </Head>

      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            DeutschLernen
          </Link>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.name}</span>
            <Link
              href="/login"
              className="px-3 py-1 bg-blue-700 rounded hover:bg-blue-800"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-bold text-lg mb-4">Course Progress</h3>
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {progressPercentage}% Complete
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {progress.completedLessons} of {progress.totalLessons} lessons
                completed
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4">Navigation</h3>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 bg-blue-100 rounded text-blue-700"
                    >
                      Course Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      Help & Support
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-6">A1 German Course</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4">Continue Learning</h3>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium">Module: Grammar Basics</h4>
                <p className="text-lg font-semibold">
                  Lesson 9: Articles (der, die, das)
                </p>
                <div className="mt-3">
                  <Link
                    href="/lessons/9"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Continue Lesson
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6">Course Modules</h3>

              <div className="space-y-8">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="border-b pb-6 last:border-b-0 last:pb-0"
                  >
                    <h4 className="text-lg font-medium mb-4">{module.title}</h4>
                    <ul className="space-y-3">
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={lesson.completed}
                              onChange={() =>
                                toggleLessonCompletion(module.id, lesson.id)
                              }
                              className="mr-3 h-5 w-5 text-blue-600"
                            />
                            <span
                              className={
                                lesson.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }
                            >
                              {lesson.title}
                            </span>
                          </div>
                          <Link
                            href={`/lessons/${lesson.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
