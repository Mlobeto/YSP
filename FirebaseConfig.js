import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuykRasFoN0P9vmaQFuh7-A_c5FZd0qL0",
  authDomain: "nysp-f04e4.firebaseapp.com",
  projectId: "nysp-f04e4",
  storageBucket: "nysp-f04e4.appspot.com",
  messagingSenderId: "522119906082",
  appId: "1:522119906082:web:3a8a9c2de8fca45ebb5b7b"
};

const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const db= getFirestore(app)


