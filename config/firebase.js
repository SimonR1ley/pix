// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo2-D3bxhYWX7xFHQIP01uiGlxB_lZwSQ",
  authDomain: "pixapp-6066c.firebaseapp.com",
  projectId: "pixapp-6066c",
  storageBucket: "pixapp-6066c.appspot.com",
  messagingSenderId: "485509152336",
  appId: "1:485509152336:web:f728021f00ad0063409b55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
