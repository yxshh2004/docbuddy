// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// ✅ Correct order: initialize app first
const firebaseConfig = {
  apiKey: "AIzaSyCy6dfnzIV8VWrvfDphZd7lh5V2NmNYGO8",
  authDomain: "doctorbuddy-411eb.firebaseapp.com",
  projectId: "doctorbuddy-411eb",
  storageBucket: "doctorbuddy-411eb.appspot.com",
  messagingSenderId: "326623394686",
  appId: "1:326623394686:web:360a4045f54ecc47ce912f",
  measurementId: "G-195GDW97M5",
};

// Initialize Firebase once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Now export everything AFTER initializing `app`
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
