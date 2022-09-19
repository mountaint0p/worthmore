import { firebaseKey } from "./firebaseKey";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Initialize Firebase
export const app = initializeApp(firebaseKey);
export const analytics = getAnalytics(app);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
