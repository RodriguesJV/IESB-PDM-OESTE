// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSG_uglgouJBlNx9UUdcjtGWh27RcB6Do",
  authDomain: "app-financas-6b715.firebaseapp.com",
  projectId: "app-financas-6b715",
  storageBucket: "app-financas-6b715.firebasestorage.app",
  messagingSenderId: "185764025307",
  appId: "1:185764025307:web:923881d3953f5d790f4dfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);