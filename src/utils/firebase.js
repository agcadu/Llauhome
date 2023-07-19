
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);