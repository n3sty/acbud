// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb3XK5DIJmOeOPLdF1KA1J0U6wqFYKoJ8",
  authDomain: "acbud-98a3c.firebaseapp.com",
  projectId: "acbud-98a3c",
  storageBucket: "acbud-98a3c.appspot.com",
  messagingSenderId: "64747995404",
  appId: "1:64747995404:web:3d2e9b702ea2703a3a4929",
  measurementId: "G-EN2WXCMM6D"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, db, auth, storage };