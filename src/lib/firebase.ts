// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASqM-EZ6nHRfXYGZdhgzE2AoKsMD-rlCU",
  authDomain: "cha-de-bebe-da-alice.firebaseapp.com",
  projectId: "cha-de-bebe-da-alice",
  storageBucket: "cha-de-bebe-da-alice.appspot.com",
  messagingSenderId: "696347777516",
  appId: "1:696347777516:web:e927b73340d497d84848c9"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(firebaseApp);