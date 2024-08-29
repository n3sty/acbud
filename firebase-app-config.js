import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  "projectId": "acbud-98a3c",
  "appId": "1:64747995404:web:3d2e9b702ea2703a3a4929",
  "storageBucket": "acbud-98a3c.appspot.com",
  "locationId": "europe-west",
  "apiKey": "AIzaSyDb3XK5DIJmOeOPLdF1KA1J0U6wqFYKoJ8",
  "authDomain": "acbud-98a3c.firebaseapp.com",
  "messagingSenderId": "64747995404",
  "measurementId": "G-EN2WXCMM6D"
}

export const firebaseApp = initializeApp(firebaseConfig);