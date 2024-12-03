import { initializeApp } from "firebase/app"; // Correct import for Firebase App
import { getStorage } from "firebase/storage"; // Correct import for Firebase Storage

// Firebase configuration object (from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyB18pIISGOCKsdtO1YdOKDGcyvd5EuHN_Y",
    authDomain: "mathbot567.firebaseapp.com",
    projectId: "mathbot567",
    storageBucket: "mathbot567.appspot.com",
    messagingSenderId: "1025889317766",
    appId: "1:1025889317766:web:c4d684efb2f97a8526b207",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
