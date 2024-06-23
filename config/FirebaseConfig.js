// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "quick-meet-e3c61.firebaseapp.com",
  projectId: "quick-meet-e3c61",
  storageBucket: "quick-meet-e3c61.appspot.com",
  messagingSenderId: "669961834654",
  appId: "1:669961834654:web:54db47cd7fc9e5861ceb8f",
  measurementId: "G-P0GY7S8705",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
