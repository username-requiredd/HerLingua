import { motion } from "framer-motion";
import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
const Hero = ({ setShowModal }) => {
  return (
    <>
      <div className="relative pt-20">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 skew-y-6 transform -translate-y-10 z-0"
          style={{ height: "70%" }}
        ></div>
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
                <span className="block text-yellow-200">
                  Naturally & Effectively
                </span>
              </h1>
              <p className="text-lg md:text-xl mt-6 text-purple-100">
                Join over 10,000 students who have transformed their lives by
                learning German the right way. Interactive, immersive, and
                incredibly effective.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-white flex items-center text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-200 transition shadow-lg"
                >
                  Start Learning Now <ArrowBigRight />
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
                  <Image
                    src="/images/r.jpeg"
                    width={800}
                    height={600}
                    alt="Learn German"
                    className="rounded-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-800 to-transparent p-6">
                    <div className="flex items-center"></div>
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
                <svg
                  className="w-6 h-6 text-pink-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <p className="text-pink-600 font-medium tracking-wider uppercase text-sm">
                  Trusted By Organizations Worldwide
                </p>
              </div>
              <h3 className="text-2xl font-bold text-purple-800">
                Recognized by Leading Institutions
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                {
                  name: "Goethe Institut",
                  logo: "/images/logo/goethe.jpeg",
                },
                {
                  name: "Deutsche Welle",
                  logo: "/images/logo/deutsche-welle.png",
                },
                {
                  name: "Berlin University",
                  logo: "/images/logo/berlinuniversity.jpeg",
                },
                {
                  name: "Munich Business School",
                  logo: "/images/logo/munichbusinessschool.jpeg",
                },
                {
                  name: "EU Commission",
                  logo: "/images/logo/eucommission.jpeg",
                },
              ].map((org, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg border border-pink-100 hover:border-pink-200 transition-all"
                >
                  <div className="w-16 h-16 mb-3 bg-pink-50 rounded-full flex items-center justify-center p-3">
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </div>

                  <span className="text-purple-700 font-medium text-sm text-center">
                    {org.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="inline-flex items-center px-6 py-2 border border-pink-300 rounded-full text-pink-600 hover:bg-pink-50 transition-all">
                <span>View All Partners</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
