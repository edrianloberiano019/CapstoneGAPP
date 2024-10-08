// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo_7LewhB2oTqsM3EZ9bDdFAhmR_gUkR8",
  authDomain: "gapp2-22488.firebaseapp.com",
  projectId: "gapp2-22488",
  storageBucket: "gapp2-22488.appspot.com",
  messagingSenderId: "70406020000",
  appId: "1:70406020000:web:9bacae1a4ad4ef755b22c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };