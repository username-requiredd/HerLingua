import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <>
      <div className="container mx-auto flex items-center justify-center  px-4 py-16">
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
                Join our community of 10,000+ learners and get instant access to
                your first free lesson!
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-yellow-200 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Start Your First Lesson
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  How It Works
                </motion.button>
              </div>

              <div className="mt-6 flex items-center justify-center md:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`images/testimonials/grace.webp`}
                      alt={`Avatar ${i}`}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
              </div>
              <p className="ml-3 text-pink-100">
                <span className="font-semibold text-white">1,200+</span>{" "}
                learners started today
              </p>
            </div>
          </div>

          {/* <div className="md:w-1/3 mt-10 md:mt-0 flex justify-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border-2 border-white/30"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Free Starter Kit
                </h3>
                <p className="text-pink-100 mb-4">
                  Includes vocabulary sheets, pronunciation guide, and cultural
                  tips
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md w-full"
                >
                  Download Now
                </motion.button>
              </div>
            </motion.div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CallToAction;
