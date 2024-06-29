import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEKLTmiT5M6hAQHKgHtUyK-IP8r4LNYSk",
  authDomain: "chat-3b890.firebaseapp.com",
  projectId: "chat-3b890",
  storageBucket: "chat-3b890.appspot.com",
  messagingSenderId: "826208620125",
  appId: "1:826208620125:web:830df5e7d663ffe07487b4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
