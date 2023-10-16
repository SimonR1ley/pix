// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCo2-D3bxhYWX7xFHQIP01uiGlxB_lZwSQ",
//   authDomain: "pixapp-6066c.firebaseapp.com",
//   projectId: "pixapp-6066c",
//   storageBucket: "pixapp-6066c.appspot.com",
//   messagingSenderId: "485509152336",
//   appId: "1:485509152336:web:f728021f00ad0063409b55",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAT7rX60yMH5DDFQD6_vsQjcKbtnVI4vfk",
  authDomain: "pixv2-7452f.firebaseapp.com",
  projectId: "pixv2-7452f",
  storageBucket: "pixv2-7452f.appspot.com",
  messagingSenderId: "372720144752",
  appId: "1:372720144752:web:4aa128fee1ae0c26c33fb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
