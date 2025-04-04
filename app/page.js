"use client";
import { useState, useEffect } from "react";
import Hero from "./components/hero";
import Features from "./components/features";
import CourseLevels from "./components/courselevels";
import Testimonials from "./components/testimonials";
import Faq from "./components/faq";
import CallToAction from "./components/calltoaction";
import Navbar from "./components/landingpagenaw";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-900 overflow-x-hidden">
      <Navbar setShowModal={setShowModal} isScrolled={isScrolled} />
  
      <main className="max-w-[100vw] overflow-hidden">
        <Hero setShowModal={setShowModal} />
        <Features />
        <CourseLevels />
        <Testimonials />
        <Faq />
        <CallToAction />
      </main>
    </div>
  );
}