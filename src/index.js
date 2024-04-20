

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo9egSgUbndxq7EXMLrDwJwV1yYtpkOMs",
  authDomain: "majestic-ng.firebaseapp.com",
  projectId: "majestic-ng",
  storageBucket: "majestic-ng.appspot.com",
  messagingSenderId: "341925778065",
  appId: "1:341925778065:web:eb7723e013d44c5573a530",
  measurementId: "G-ZHLQ9MBGHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);