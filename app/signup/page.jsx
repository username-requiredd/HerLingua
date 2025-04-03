"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";

export function SignUp({ onClose, setShowModal, setOnSwitchToSignIn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords don't match",
        text: "Please make sure your passwords match.",
      });
      return;
    }

    if (gender !== "Female") {
      Swal.fire({
        icon: "info",
        title: "Registration Restricted",
        text: "Only females can register for HerLingua.",
        confirmButtonColor: "#ec4899",
      });
      return;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
        onClose ? "block" : "hidden"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md mx-2"
      >
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 sm:p-6 text-center relative">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Join HerLingua
          </h3>
          <p className="text-pink-100 text-sm sm:text-base mt-1">
            Begin your language journey today
          </p>
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-pink-100 hover:text-white"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm sm:text-base"
                placeholder="Maria Schmidt"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm sm:text-base"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm sm:text-base"
                placeholder="Create a password"
                required
                minLength="6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm sm:text-base"
                placeholder="Confirm your password"
                required
                minLength="6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent text-sm sm:text-base"
                required
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 sm:py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-medium text-sm sm:text-base"
            >
              Create Account
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
