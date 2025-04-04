import { db } from "@/lib/firebase";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  serverTimestamp,
  onSnapshot 
} from "firebase/firestore";

export const updateUserProgress = async (userId, lessonId, isCompleted) => {
  const userProgressRef = doc(db, "userProgress", userId);
  
  try {
    const progressDoc = await getDoc(userProgressRef);
    
    if (progressDoc.exists()) {
      const updateData = {
        [`lessons.${lessonId}`]: isCompleted,
        lastUpdated: serverTimestamp()
      };
      
      if (isCompleted) {
        updateData.completedLessons = arrayUnion(lessonId);
      } else {
        updateData.completedLessons = arrayRemove(lessonId);
      }
      
      await updateDoc(userProgressRef, updateData);
    } else {
      await setDoc(userProgressRef, {
        userId,
        totalLessons: 30, 
        completedLessons: isCompleted ? [lessonId] : [],
        lessons: {
          [lessonId]: isCompleted
        },
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
};

export const getUserProgress = async (userId) => {
  const userProgressRef = doc(db, "userProgress", userId);
  
  try {
    const docSnap = await getDoc(userProgressRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user progress:", error);
    throw error;
  }
};

export const listenToUserProgress = (userId, callback) => {
  const userProgressRef = doc(db, "userProgress", userId);
  
  const unsubscribe = onSnapshot(userProgressRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      callback(null);
    }
  });
  
  return unsubscribe;
};