// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx88sR49V00zk-53F_nYv4hvN2SWnRZ4M",
  authDomain: "todowithdatabase-f7031.firebaseapp.com",
  projectId: "todowithdatabase-f7031",
  storageBucket: "todowithdatabase-f7031.firebasestorage.app",
  messagingSenderId: "398539287036",
  appId: "1:398539287036:web:ee6886b84d7b98c6bd6a79"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};