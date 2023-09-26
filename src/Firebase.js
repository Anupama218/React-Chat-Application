import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC9kGerWQbs7IL-1dOv3MEl8LfEKETqIA",
  authDomain: "chatbot-6f757.firebaseapp.com",
  projectId: "chatbot-6f757",
  storageBucket: "chatbot-6f757.appspot.com",
  messagingSenderId: "505257510853",
  appId: "1:505257510853:web:b918f9f7cc367e4e00edac",
  measurementId: "G-D72K04060L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
//const analytics = getAnalytics(app);