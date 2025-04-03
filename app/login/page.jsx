"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export function SignIn({ onClose, setOnSwitchToSignUp, setShowModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
        onClose ? "block" : "hidden"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md"
      >
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-center relative">
          <h3 className="text-2xl font-bold text-white">Welcome Back!</h3>
          <p className="text-pink-100 mt-1">Continue your German journey</p>
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className="absolute top-4 right-4 text-pink-100 hover:text-white"
          >
            <svg
              className="w-6 h-6"
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

        <div className="p-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-white border border-pink-200 text-gray-700 py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </motion.button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-pink-200"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-1 border-t border-pink-200"></div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                placeholder="your@email.com"
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
                className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-pink-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setOnSwitchToSignUp(true);
                }}
                className="text-pink-600 font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
