// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqi3OQmymgcZ8M5Tjaqf41tc2bBLUmKIs",
  authDomain: "studysync-c3f2b.firebaseapp.com",
  projectId: "studysync-c3f2b",
  storageBucket: "studysync-c3f2b.appspot.com",
  messagingSenderId: "1045648446436",
  appId: "1:1045648446436:web:4ddcf76ecfb92fbcaa2df1",
  measurementId: "G-R7V7VC8QX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };