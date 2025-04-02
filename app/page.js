'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowBigRight } from 'lucide-react';
import { SignIn } from './login/page';
import { SignUp } from './signup/page';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('a1'); 
  const [onSwitchToSignUp, setOnSwitchToSignUp] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const courseLevels = {
    a1: {
      title: "Absolute Beginner (A1)",
      description: "Start from zero with basic greetings, simple vocabulary, and essential phrases.",
      duration: "8 weeks",
      modules: 4,
      features: ["Alphabet & pronunciation", "Everyday expressions", "Introduce yourself", "100+ basic words"]
    },
    a2: {
      title: "Elementary (A2)",
      description: "Build confidence with common phrases and simple conversations.",
      duration: "10 weeks",
      modules: 5,
      features: ["Shopping dialogues", "Restaurant orders", "Present tense mastery", "300+ vocabulary"]
    },
    b1: {
      title: "Intermediate (B1)",
      description: "Handle travel situations and express opinions on familiar topics.",
      duration: "12 weeks",
      modules: 6,
      features: ["Past/future tenses", "Debate simple topics", "Understand news headlines", "Work communication"]
    },
    b2: {
      title: "Upper Intermediate (B2)",
      description: "Discuss abstract ideas and interact with native speakers comfortably.",
      duration: "14 weeks",
      modules: 7,
      features: ["Technical discussions", "Advanced grammar", "Idiomatic expressions", "Business emails"]
    },
    c1: {
      title: "Advanced (C1)",
      description: "Express yourself fluently in professional and academic settings.",
      duration: "16 weeks",
      modules: 8,
      features: ["Academic writing", "Nuanced debates", "Literature analysis", "Professional presentations"]
    },
    c2: {
      title: "Proficiency (C2)",
      description: "Master German at near-native level with cultural subtleties.",
      duration: "18 weeks",
      modules: 9,
      features: ["Legal/medical German", "Regional dialects", "Translation skills", "Public speaking"]
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-900">
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-xl">D</div>
            <span className="ml-2 font-bold text-xl text-pink-600">DeutschMaster</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-pink-600 transition">Features</a>
            <a href="#courses" className="hover:text-pink-600 transition">Courses</a>
            <a href="#testimonials" className="hover:text-pink-600 transition">Testimonials</a>
            <a href="#faq" className="hover:text-pink-600 transition">FAQ</a>
          </div>
          <button 
            className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
            onClick={() => setShowModal(true)}
          >
            Sign In
          </button>
        </div>
      </nav>
{showModal && onSwitchToSignUp ? <SignUp onClose={showModal} setShowModal={setShowModal} setOnSwitchToSignIn={setOnSwitchToSignUp} />
: <SignIn onClose={showModal} setShowModal={setShowModal} setOnSwitchToSignUp={setOnSwitchToSignUp} />}
      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 skew-y-6 transform -translate-y-10 z-0" style={{ height: '70%' }}></div>
        <div className="container mx-auto px-4 pt-16 pb-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="md:w-1/2 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                <span className="block">Master German</span> 
                <span className="block text-yellow-200">Naturally & Effectively</span>
              </h1>
              <p className="text-lg md:text-xl mt-6 text-purple-100">Join over 10,000 students who have transformed their lives by learning German the right way. Interactive, immersive, and incredibly effective.</p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <button className="bg-white flex items-center text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-200 transition shadow-lg">
                  Start Learning Now <ArrowBigRight/>
                </button>
                {/* <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition">
                  View Course Syllabus
                </button> */}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:w-1/2 mt-10 md:mt-0"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-white rounded-3xl shadow-xl transform rotate-3 z-0"></div>
                <div className="relative z-10 bg-white p-2 rounded-3xl shadow-2xl overflow-hidden">
                  <Image src="/images/r.jpeg" width={800} height={600} alt="Learn German" className="rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-800 to-transparent p-6">
                    <div className="flex items-center">
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Trust badges */}
         
          <motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.5, delay: 0.8 }}
  className="mt-16 bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl shadow-xl border border-pink-100"
>
  <div className="text-center mb-8">
    <div className="inline-flex items-center justify-center mb-3">
      <svg className="w-6 h-6 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <p className="text-pink-600 font-medium tracking-wider uppercase text-sm">Trusted By Organizations Worldwide</p>
    </div>
    <h3 className="text-2xl font-bold text-purple-800">Recognized by Leading Institutions</h3>
  </div>
  
  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
    {[
      { name: 'Goethe Institut', logo: '/icons/goethe.svg' },
      { name: 'Deutsche Welle', logo: '/icons/dwelle.svg' },
      { name: 'Berlin University', logo: '/icons/berlin-uni.svg' },
      { name: 'Munich Business School', logo: '/icons/munich-bs.svg' },
      { name: 'EU Commission', logo: '/icons/eu-comm.svg' }
    ].map((org, i) => (
      <motion.div 
        key={i}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg border border-pink-100 hover:border-pink-200 transition-all"
      >
        <div className="w-16 h-16 mb-3 bg-pink-50 rounded-full flex items-center justify-center p-3">
          {/* Replace with actual logo images */}
          <div className="text-pink-500 font-bold text-xs text-center">{org.name.split(' ')[0]}</div>
        </div>
        <span className="text-purple-700 font-medium text-sm text-center">{org.name}</span>
      </motion.div>
    ))}
  </div>
  
  <div className="mt-8 text-center">
    <button className="inline-flex items-center px-6 py-2 border border-pink-300 rounded-full text-pink-600 hover:bg-pink-50 transition-all">
      <span>View All Partners</span>
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600">A Revolutionary Way to Learn German</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Our scientifically proven methodology combines modern technology with traditional immersion techniques.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          {[
            {
              title: "Interactive Lessons",
              description: "Engage in real conversations with AI-powered virtual natives",
              icon: "🎯"
            },
            {
              title: "Personalized Learning",
              description: "Adaptive system that focuses on your weak areas",
              icon: "🧠"
            },
            {
              title: "Cultural Immersion",
              description: "Learn the language within cultural context and nuances",
              icon: "🌍"
            },
            {
              title: "Certification Ready",
              description: "Prepare for official German language certifications",
              icon: "🏆"
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-pink-600">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Methodology section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600">Our Proven Methodology</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">A structured approach that takes you from complete beginner to confident speaker</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 border-l-2 border-dashed border-pink-300 h-full"></div>
            
            {[
              {
                title: "Foundation Building",
                description: "Master essential vocabulary, pronunciation, and basic grammar through interactive exercises.",
                position: "left",
                icon: "📚"
              },
              {
                title: "Conversation Practice",
                description: "Develop speaking confidence with our AI conversation partners and group sessions.",
                position: "right",
                icon: "💬"
              },
              {
                title: "Cultural Context",
                description: "Learn how Germans think, interact, and express themselves through cultural notes and stories.",
                position: "left",
                icon: "🎭"
              },
              {
                title: "Real-World Application",
                description: "Apply your knowledge in simulated real-life scenarios from ordering food to job interviews.",
                position: "right",
                icon: "🌉"
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: step.position === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative mb-16 ${step.position === "left" ? "md:text-right" : ""}`}
              >
                <div className={`md:w-1/2 ${step.position === "right" ? "md:ml-auto" : ""}`}>
                  <div className={`bg-white p-6 rounded-2xl shadow-lg ${step.position === "left" ? "md:mr-8" : "md:ml-8"}`}>
                    <div className="flex items-center mb-4 text-pink-600">
                      <div className={`text-3xl ${step.position === "left" ? "md:order-last md:ml-4" : "mr-4"}`}>{step.icon}</div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-pink-500 bg-white z-10 flex items-center justify-center">
                  <span className="font-bold text-pink-500">{i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Course Levels Section */}
  
{/* Course Levels Section */}
<div id="courses" className="bg-purple-50 py-16">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600">Complete Learning Path</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Our free curriculum takes you from complete beginner to fluent speaker
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
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white text-pink-600 hover:bg-pink-50'
            }`}
          >
            {courseLevels[level].title.split('(')[0].trim()}
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
                {courseLevels[activeTab].duration} • {courseLevels[activeTab].modules} Modules
              </p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
              FREE
            </span>
          </div>

          <p className="mt-4 text-gray-600">{courseLevels[activeTab].description}</p>

          <div className="mt-8">
            <h4 className="font-semibold text-pink-600 mb-3">You'll master:</h4>
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
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md flex items-center justify-center">
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
            </button>
            <button className="border border-pink-300 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center">
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
            </button>
          </div>
        </div>

        <div className="md:w-1/3 bg-gradient-to-b from-pink-500 to-purple-500 p-8 text-white">
          <div className="h-full flex flex-col">
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-3">This Course Includes:</h4>
              <ul className="space-y-3">
                {[
                  "Interactive exercises",
                  "Downloadable resources",
                  "Certificate of completion",
                  "Community access",
                  "Progress tracking"
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



      {/* Testimonials Section */}
      <div id="testimonials" className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600">Student Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Hear from our students who transformed their lives through our German courses</p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "After trying multiple language apps with no success, this course finally helped me become conversational in German. The structured approach and cultural context made all the difference.",
              name: "Alex Morgan",
              role: "Software Developer",
              city: "London",
              rating: 5,
              image: "/api/placeholder/80/80"
            },
            {
              quote: "I needed to learn German quickly for my job relocation to Berlin. This course was perfect - practical, efficient, and focused on real-world communication. Within 3 months I was comfortable in business meetings.",
              name: "Sarah Lindemann",
              role: "Marketing Manager",
              city: "New York",
              rating: 5,
              image: "/api/placeholder/80/80"
            },
            {
              quote: "The cultural immersion aspect of this course is what sets it apart. I not only learned the language but also understood how Germans think and communicate, which made my transition to living in Munich so much smoother.",
              name: "Takashi Yamamoto",
              role: "Graduate Student",
              city: "Tokyo",
              rating: 5,
              image: "/api/placeholder/80/80"
            }
          ].map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image src={testimonial.image} width={48} height={48} alt={testimonial.name} className="rounded-full" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats section */}
        <div className="mt-20 bg-pink-500 rounded-2xl shadow-lg text-white p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Our Impact in Numbers</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10,000+", label: "Students" },
              { value: "93%", label: "Completion Rate" },
              { value: "87%", label: "Pass Official Exams" },
              { value: "47", label: "Countries" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-yellow-200">{stat.value}</div>
                <div className="mt-2 text-pink-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div id="faq" className="bg-purple-50 py-16">
  <div className="container mx-auto px-4">
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600">Frequently Asked Questions</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Everything you need to know about our German language courses</p>
    </div>
    
    <div className="mt-12 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-center gap-6">
        {[
          {
            question: "How long does it take to become fluent?",
            answer: "Most students achieve conversational fluency (B1 level) within 6 months of consistent study. To reach advanced proficiency (C1 level), it typically takes 12-18 months depending on your dedication and prior language learning experience."
          },
          {
            question: "Do I need any prior knowledge of German?",
            answer: "Not at all! Our beginner courses start from absolute zero, assuming no prior knowledge of German or any other foreign language. Our structured approach ensures you'll build a solid foundation from day one."
          },
          {
            question: "How much time should I dedicate each week?",
            answer: "We recommend at least 5-7 hours per week for optimal progress. This includes 2-3 hours of guided lessons and 3-4 hours of practice and exercises. However, our flexible learning system allows you to adjust based on your schedule."
          },
        ].map((faq, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex-1 min-w-[300px] max-w-[400px] mb-6 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="font-semibold text-lg text-pink-600">{faq.question}</h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</div>

      {/* Call-to-Action Section */}
      <div className="container mx-auto px-4 py-16">
  <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
    {/* Decorative elements */}
    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-pink-400/20 backdrop-blur-sm"></div>
    <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-purple-400/20 backdrop-blur-sm"></div>
    
    <div className="relative z-10 md:flex items-center justify-between">
      <div className="md:w-2/3 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Ready to Speak German Confidently?
        </h2>
        <p className="mt-4 text-xl text-pink-100 max-w-2xl">
          Join our community of 10,000+ learners and get instant access to your first free lesson!
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-yellow-200 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Your First Lesson
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            How It Works
          </motion.button>
        </div>
        
        <div className="mt-6 flex items-center justify-center md:justify-start">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-pink-300" />
            ))}
          </div>
          <p className="ml-3 text-pink-100">
            <span className="font-semibold text-white">1,200+</span> learners started today
          </p>
        </div>
      </div>
      
      {/* Visual element replacing the form */}
      <div className="md:w-1/3 mt-10 md:mt-0 flex justify-center">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border-2 border-white/30"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Free Starter Kit</h3>
            <p className="text-pink-100 mb-4">Includes vocabulary sheets, pronunciation guide, and cultural tips</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md w-full"
            >
              Download Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}