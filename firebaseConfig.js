import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9Bpy2acUpHXJ785vGx6S0GIBzxxMh9pc",
  authDomain: "adoteumpet-83c02.firebaseapp.com",
  projectId: "adoteumpet-83c02",
  storageBucket: "adoteumpet-83c02.appspot.com",
  messagingSenderId: "908496231218",
  appId: "1:908496231218:web:fd8672e89b4805d5aa952b",
  measurementId: "G-8D4KV52VDJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
