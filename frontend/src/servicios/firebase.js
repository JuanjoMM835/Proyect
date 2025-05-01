import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAxMXvIfvr7z1gFqBA6iV7hpQO8cI7Vaw",
    authDomain: "estructuras-cce58.firebaseapp.com",
    projectId: "estructuras-cce58",
    storageBucket: "estructuras-cce58.firebasestorage.app",
    messagingSenderId: "1019805343424",
    appId: "1:1019805343424:web:c4023d50caf70d42d95725",
    measurementId: "G-3Y32F3J6Y6"
  };
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);