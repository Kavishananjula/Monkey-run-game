// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYYCQTSZb561FEtKUt01PFCT222ib8plQ",
  authDomain: "monkey-jump-main-a24f8.firebaseapp.com",
  projectId: "monkey-jump-main-a24f8",
  storageBucket: "monkey-jump-main-a24f8.firebasestorage.app",
  messagingSenderId: "973880572036",
  appId: "1:973880572036:web:b67120277d6d6802316ad1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, db };


