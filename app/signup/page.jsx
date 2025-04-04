"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });
  const [loading, setLoading] = useState({
    email: false,
    google: false
  });
  const router = useRouter();

  const createUserDocument = async (user, additionalData = {}) => {
    const userRef = doc(db, "users", user.uid);
    const progressRef = doc(db, "userProgress", user.uid);

    await Promise.all([
      setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: additionalData.displayName || "",
        gender: additionalData.gender || "",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        profileComplete: false,
        role: "student",
        emailVerified: user.emailVerified || false
      }),
      setDoc(progressRef, {
        userId: user.uid,
        lessonsCompleted: 0,
        lastUpdated: serverTimestamp(),
        lessons: {}
      })
    ]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, email: true }));

    try {
      // Form validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (formData.gender !== "Female") {
        Swal.fire({
          icon: "info",
          title: "Registration Restricted",
          text: "Only females can register for HerLingua.",
          confirmButtonColor: "#ec4899",
        });
        return;
      }

      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update profile and create documents
      await Promise.all([
        updateProfile(userCredential.user, { displayName: formData.name }),
        createUserDocument(userCredential.user, {
          displayName: formData.name,
          gender: formData.gender
        })
      ]);

      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Welcome to HerLingua!",
        text: "Your account has been created successfully.",
        confirmButtonColor: "#ec4899",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      let errorMessage = "An error occurred during registration.";
      
      switch (error.code || error.message) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        case "Passwords don't match":
          errorMessage = "Passwords do not match. Please try again.";
          break;
        default:
          console.error("Signup error:", error);
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
        confirmButtonColor: "#ec4899",
      });
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(prev => ({ ...prev, google: true }));
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user);
      
      await Swal.fire({
        icon: "success",
        title: "Welcome to HerLingua!",
        text: "Google sign-up successful!",
        confirmButtonColor: "#ec4899",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Google signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Google Sign Up Failed",
        text: "An error occurred during Google sign-up. Please try again.",
        confirmButtonColor: "#ec4899",
      });
    } finally {
      setLoading(prev => ({ ...prev, google: false }));
    }
  };

  const isProcessing = loading.email || loading.google;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">HerLingua</h1>
          <p className="text-pink-500 text-lg">Empowering Women Through Language Learning</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <button
              onClick={handleGoogleSignUp}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-pink-100 text-gray-700 p-3 rounded-lg 
                        hover:border-pink-200 transition-colors mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading.google ? (
                <Spinner text="Signing up with Google..." />
              ) : (
                <>
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-pink-100" />
              <span className="mx-4 text-gray-500 text-sm">or with email</span>
              <div className="flex-1 border-t border-pink-100" />
            </div>

            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength="6"
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  minLength="6"
                />
                
                <SelectField
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  options={["Female", "Male", "Other"]}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-lg font-semibold
                          hover:shadow-lg transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading.email ? (
                  <Spinner text="Creating Account..." />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-pink-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-pink-700 hover:text-pink-800 underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        <footer className="mt-8 text-center text-sm text-pink-700">
          <p>
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-pink-800">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-pink-800">
              Privacy Policy
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

// Reusable Components
const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-pink-700 mb-1">
      {label}
    </label>
    <input
      className="w-full px-4 py-2.5 rounded-lg border border-pink-100 focus:ring-2 focus:ring-pink-300
                focus:border-transparent transition-all disabled:opacity-70"
      {...props}
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-pink-700 mb-1">
      {label}
    </label>
    <select
      className="w-full px-4 py-2.5 rounded-lg border border-pink-100 focus:ring-2 focus:ring-pink-300
                focus:border-transparent bg-white disabled:opacity-70"
      {...props}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const Spinner = ({ text }) => (
  <span className="flex items-center justify-center">
    <svg
      className="animate-spin h-5 w-5 mr-2 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    {text}
  </span>
);

const GoogleIcon = () => (
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
);