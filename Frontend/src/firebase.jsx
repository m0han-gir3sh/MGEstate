// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { serverTimestamp } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBHP8YkOCDamN2gjBDuSjNuMH2Z2nq64_w",
  authDomain: "giresh.firebaseapp.com",
  projectId: "giresh",
  storageBucket: "giresh.appspot.com",
  messagingSenderId: "481331682299",
  appId: "1:481331682299:web:3cab8370eb7aa0c366895e"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const timestamp = serverTimestamp();
export { auth, provider, timestamp };
