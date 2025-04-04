"use client";
import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { listenToUserProgress } from "@/services/userprogress";
import Head from "next/head";

import DashboardContent from "./DashboardContent";
import DashboardLayout from "./dashboardlayout";
import ErrorDisplay from "./errordisplay";
import LogoutButton from "./logoutsuccess";
import LoadingSpinner from "./loadingspinner";

function Dashboard() {
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        const unsubscribeProgress = listenToUserProgress(currentUser.uid, (progressData) => {
          setLoading(false);
          if (progressData) {
            const completed = progressData.completedLessons?.length || 0;
            const total = progressData.totalLessons || 11;
            
            setCompletedCount(completed);
            setTotalLessons(total);
            setProgress(Math.round((completed / total) * 100));
          } else {
            setCompletedCount(0);
            setTotalLessons(30);
            setProgress(0);
          }
        }, (err) => {
          setLoading(false);
          setError("Failed to load progress data. Please try again later.");
          console.error("Error fetching progress:", err);
        });
        
        return () => unsubscribeProgress();
      } else {
        setUser(null);
        setLoading(false);
        router.push("/signin");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogoutSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setError("Failed to sign out. Please try again.");
      console.error("Error signing out:", error);
    }
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const streakDays = 5; 
  const lastActiveDate = new Date(); 
  const today = new Date();
  const daysSinceActive = Math.floor((today - lastActiveDate) / (1000 * 60 * 60 * 24));
  
  const getPersonalizedMessage = () => {
    if (progress === 0) return "Ready to start your journey?";
    if (daysSinceActive > 2) return "Welcome back! Ready to continue?";
    if (progress < 30) return "You're making steady progress!";
    if (progress < 70) return "Keep up the amazing work!";
    return "You're almost there!";
  };

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (logoutSuccess) {
    return <LogoutButton />;
  }

  return (
    <>
      <Head>
        <title>Dashboard - HerLingua</title>
      </Head>
      
      <DashboardLayout 
        mobileSidebarOpen={mobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
        handleLogout={handleLogout}
        user={user}
      >
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay error={error} />
        ) : (
          <DashboardContent 
            user={user}
            progress={progress}
            completedCount={completedCount}
            totalLessons={totalLessons}
            streakDays={streakDays}
            daysSinceActive={daysSinceActive}
            getTimeOfDayGreeting={getTimeOfDayGreeting}
            getPersonalizedMessage={getPersonalizedMessage}
          />
        )}
      </DashboardLayout>
    </>
  );
}

export default Dashboard;