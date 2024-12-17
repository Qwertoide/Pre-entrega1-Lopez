import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBfJtaRMthR9l_by43Z0orBniTmXnZCjeI",
  authDomain: "ecommerce-coderhouse-sorli.firebaseapp.com",
  projectId: "ecommerce-coderhouse-sorli",
  storageBucket: "ecommerce-coderhouse-sorli.firebasestorage.app",
  messagingSenderId: "208677365759",
  appId: "1:208677365759:web:5fc3d9d00b84c5566829ca"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)