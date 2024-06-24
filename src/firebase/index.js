// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Auth kurulumu için importlar
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Firebase configuration
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: "chat-c4e3e.firebaseapp.com",
  projectId: "chat-c4e3e",
  storageBucket: "chat-c4e3e.appspot.com",
  messagingSenderId: "347067542042",
  appId: "1:347067542042:web:754b4dd04d8e46ee4f7fa3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Kimlik doğrulama hizmetinin referansını al
export const auth = getAuth(app);

// Google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

// Veritabanının referansını al
export const db = getFirestore(app);
