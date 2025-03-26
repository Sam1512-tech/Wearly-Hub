import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyClQtcV4YwSX8E6mE-AUcvjgGTi75TAMb8",
    authDomain: "ecommerce-app-b45db.firebaseapp.com",
    projectId: "ecommerce-app-b45db",
    storageBucket: "ecommerce-app-b45db.firebasestorage.app",
    messagingSenderId: "268000358476",
    appId: "1:268000358476:web:bc77a14526d9caea7e44e9",
    measurementId: "G-QBLEJR8SWZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);