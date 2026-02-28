import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyByED4Wof_iZcbwyAcG2a8VRQFBOAkMG_U",
    authDomain: "search-job-links-saas.firebaseapp.com",
    projectId: "search-job-links-saas",
    storageBucket: "search-job-links-saas.firebasestorage.app",
    messagingSenderId: "73419991503",
    appId: "1:73419991503:web:a1aef0b242979918f5caba",
    measurementId: "G-52PL948102"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
