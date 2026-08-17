import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB65pgHE250Zv2ddGFsDhM7eYnaxfP-6rc",
  authDomain: "paginaweb-525fa.firebaseapp.com",
  projectId: "paginaweb-525fa",
  storageBucket: "paginaweb-525fa.firebasestorage.app",
  messagingSenderId: "985459195201",
  appId: "1:985459195201:web:91e544da3f1e71093a75c0",
  measurementId: "G-Q7PFMEFQHH"
};

// Evita inicializar la app dos veces durante el Hot Reload de Vite
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);