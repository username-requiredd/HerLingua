"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const CourseLevels = () => {
  const [activeTab, setActiveTab] = useState("a1");

  const courseLevels = {
    a1: {
      title: "Absolute Beginner (A1)",
      description:
        "Start from zero with basic greetings, simple vocabulary, and essential phrases.",
      duration: "8 weeks",
      modules: 4,
      features: [
        "Alphabet & pronunciation",
        "Everyday expressions",
        "Introduce yourself",
        "100+ basic words",
      ],
    },
    a1_plus: {
      title: "Beginner Plus (A1+)",
      description:
        "Expand your foundation with more vocabulary and simple conversations.",
      duration: "8 weeks",
      modules: 4,
      features: [
        "Basic grammar structures",
        "Daily conversations",
        "Simple present tense",
        "200+ essential words",
      ],
    },
    a1_intensive: {
      title: "Intensive Beginner (A1)",
      description:
        "Fast-track your German basics with our accelerated program.",
      duration: "4 weeks",
      modules: 4,
      features: [
        "Accelerated learning",
        "Daily practice sessions",
        "Core vocabulary focus",
        "Quick conversation skills",
      ],
    },
    a1_business: {
      title: "Business Basics (A1)",
      description:
        "Learn fundamental German for professional settings and introductions.",
      duration: "8 weeks",
      modules: 4,
      features: [
        "Professional greetings",
        "Office vocabulary",
        "Email basics",
        "Business etiquette",
      ],
    },
    a1_travel: {
      title: "Travel German (A1)",
      description:
        "Master essential German phrases for comfortable travel experiences.",
      duration: "6 weeks",
      modules: 3,
      features: [
        "Transportation vocabulary",
        "Hotel and accommodation",
        "Ordering food and drinks",
        "Emergency phrases",
      ],
    },
    a1_comprehensive: {
      title: "Comprehensive Beginner (A1)",
      description:
        "Complete A1 program with additional cultural context and practice.",
      duration: "10 weeks",
      modules: 5,
      features: [
        "Complete A1 curriculum",
        "Cultural insights",
        "Extended vocabulary",
        "Practical exercises",
      ],
    },
  };

  return (
    <>
      <div id="courses" className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600">
              Complete Learning Path
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our free curriculum takes you from complete beginner to fluent
              speaker
            </p>
            <div className="mt-6 flex justify-center">
              <span className="bg-pink-100 text-pink-800 text-sm font-medium px-4 py-1 rounded-full">
                All courses forever free
              </span>
            </div>
          </div>

          {/* Level Selector as Tabs */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex space-x-2 mx-auto">
              {Object.keys(courseLevels).map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveTab(level)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                    activeTab === level
                      ? "bg-pink-600 text-white shadow-md"
                      : "bg-white text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  {courseLevels[level].title.split("(")[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Course Details */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-pink-600">
                      {courseLevels[activeTab].title}
                    </h3>
                    <p className="text-pink-400 font-medium mt-1">
                      {courseLevels[activeTab].duration} •{" "}
                      {courseLevels[activeTab].modules} Modules
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    FREE
                  </span>
                </div>

                <p className="mt-4 text-gray-600">
                  {courseLevels[activeTab].description}
                </p>

                <div className="mt-8">
                  <h4 className="font-semibold text-pink-600 mb-3">
                    You'll master:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseLevels[activeTab].features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-pink-400 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={"/lessons"}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md flex items-center justify-center"
                  >
                    Start Learning Now
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  {/* <button className="border border-pink-300 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Watch Intro
                  </button> */}
                </div>
              </div>

              <div className="md:w-1/3 bg-gradient-to-b from-pink-500 to-purple-500 p-8 text-white">
                <div className="h-full flex flex-col">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold mb-3">
                      This Course Includes:
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Interactive exercises",
                        "Downloadable resources",
                        "Certificate of completion",
                        "Community access",
                        "Progress tracking",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <svg
                            className="h-5 w-5 text-yellow-200 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center">
                      <svg
                        className="h-8 w-8 text-yellow-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="ml-3">
                        <p className="font-semibold">Self-paced learning</p>
                        <p className="text-sm text-pink-100">
                          Complete at your own speed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CourseLevels;
