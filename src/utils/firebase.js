
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzlJTEnZKLr5Qrkxz_-1HntwnQgyx72jQ",
  authDomain: "llauhome-a326e.firebaseapp.com",
  projectId: "llauhome-a326e",
  storageBucket: "llauhome-a326e.appspot.com",
  messagingSenderId: "635066839344",
  appId: "1:635066839344:web:a4e77ba3ff839e7ced18f5"
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);