// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDFiwatkhvFQVSNIJXrkhgwsQcmfAFc19s",
  authDomain: "blogreact-53b40.firebaseapp.com",
  projectId: "blogreact-53b40",
  storageBucket: "blogreact-53b40.appspot.com",
  messagingSenderId: "1018236390224",
  appId: "1:1018236390224:web:ceb0a5a881bc962bb67a55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
