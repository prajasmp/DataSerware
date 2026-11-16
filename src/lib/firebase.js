import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA2cd5tJD4ani9A-nkoSW73GXCMSSR0G80",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "data-serware.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://data-serware-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "data-serware",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "data-serware.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "230895817607",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:230895817607:web:4b4dee5dee5725f3e5f922",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-KR4YM4DQM0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Analytics only in client browser environment where supported
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged };
